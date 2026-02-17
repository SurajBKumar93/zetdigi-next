// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.example.com';
const API_TIMEOUT = 10000; // 10 seconds

/**
 * Custom error class for API errors
 */
export class APIError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = 'APIError';
    this.status = status;
    this.data = data;
  }
}

/**
 * Fetch wrapper with timeout and error handling
 */
async function fetchWithTimeout(url, options = {}, timeout = API_TIMEOUT) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    clearTimeout(id);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new APIError(
        errorData.message || 'API request failed',
        response.status,
        errorData
      );
    }

    return response.json();
  } catch (error) {
    clearTimeout(id);
    if (error.name === 'AbortError') {
      throw new APIError('Request timeout', 408, {});
    }
    throw error;
  }
}

/**
 * API Client
 */
export const api = {
  /**
   * Generic GET request
   */
  async get(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    return fetchWithTimeout(url, {
      method: 'GET',
      ...options,
    });
  },

  /**
   * Generic POST request
   */
  async post(endpoint, data, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    return fetchWithTimeout(url, {
      method: 'POST',
      body: JSON.stringify(data),
      ...options,
    });
  },

  /**
   * Generic PUT request
   */
  async put(endpoint, data, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    return fetchWithTimeout(url, {
      method: 'PUT',
      body: JSON.stringify(data),
      ...options,
    });
  },

  /**
   * Generic DELETE request
   */
  async delete(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    return fetchWithTimeout(url, {
      method: 'DELETE',
      ...options,
    });
  },
};

/**
 * Data fetching functions for SSR
 */

import * as dataStore from './dataStore';

// Hero/Slider Data
export async function getHeroSlides() {
  try {
    const slides = await dataStore.getHeroSlides();
    return { slides };
  } catch (error) {
    console.error('Failed to fetch hero slides:', error);
    return { slides: [] };
  }
}

// Features Data
export async function getFeatures() {
  try {
    const features = await dataStore.getFeatures();
    return { features };
  } catch (error) {
    console.error('Failed to fetch features:', error);
    return { features: [] };
  }
}

// Success Stories Data
export async function getSuccessStories() {
  try {
    const stories = await dataStore.getSuccessStories();
    return { stories };
  } catch (error) {
    console.error('Failed to fetch success stories:', error);
    return { stories: [] };
  }
}

// Portfolio Data
export async function getPortfolioItems() {
  try {
    const items = await dataStore.getPortfolioItems();
    return { items };
  } catch (error) {
    console.error('Failed to fetch portfolio:', error);
    return { items: [] };
  }
}

// Testimonials Data
export async function getTestimonials() {
  try {
    const testimonials = await dataStore.getTestimonials();
    return { testimonials };
  } catch (error) {
    console.error('Failed to fetch testimonials:', error);
    return { testimonials: [] };
  }
}

// Blog Posts Data
export async function getBlogPosts(limit = 3) {
  try {
    const allBlogs = await dataStore.getBlogs();
    // Sort by order field, then by date
    const sortedBlogs = allBlogs.sort((a, b) => {
      if (a.order !== undefined && b.order !== undefined) {
        return a.order - b.order;
      }
      return new Date(b.date) - new Date(a.date);
    });
    const posts = sortedBlogs.slice(0, limit);
    return { posts };
  } catch (error) {
    console.error('Failed to fetch blog posts:', error);
    return { posts: [] };
  }
}

// FAQ Data
export async function getFAQs() {
  try {
    const faqs = await dataStore.getFAQs();
    return { faqs };
  } catch (error) {
    console.error('Failed to fetch FAQs:', error);
    return { faqs: [] };
  }
}

// Navigation Data
export async function getNavigationData() {
  try {
    const navigation = await dataStore.getNavigation();
    return navigation;
  } catch (error) {
    console.error('Failed to fetch navigation data:', error);
    return { logo: '/logo.png', menuItems: [], cta: null };
  }
}

/**
 * Fetch all home page data in parallel for better performance
 */
export async function getHomePageData() {
  try {
    const [
      heroData,
      featuresData,
      successStoriesData,
      portfolioData,
      testimonialsData,
      blogData,
      navigationData,
    ] = await Promise.all([
      getHeroSlides(),
      getFeatures(),
      getSuccessStories(),
      getPortfolioItems(),
      getTestimonials(),
      getBlogPosts(),
      getNavigationData(),
    ]);

    return {
      hero: heroData,
      features: featuresData,
      successStories: successStoriesData,
      portfolio: portfolioData,
      testimonials: testimonialsData,
      blog: blogData,
      navigation: navigationData,
    };
  } catch (error) {
    console.error('Failed to fetch home page data:', error);
    throw error;
  }
}
