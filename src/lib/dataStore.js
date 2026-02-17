import fs from 'fs/promises';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');

export async function readData(filename) {
  try {
    const filePath = path.join(DATA_DIR, filename);
    const fileContent = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error(`Error reading ${filename}:`, error);
    throw new Error(`Failed to read data from ${filename}`);
  }
}

export async function writeData(filename, data) {
  try {
    const filePath = path.join(DATA_DIR, filename);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error(`Error writing ${filename}:`, error);
    throw new Error(`Failed to write data to ${filename}`);
  }
}

// Portfolio
export const getPortfolioItems = () => readData('portfolio.json');
export const savePortfolioItems = (items) => writeData('portfolio.json', items);

// Testimonials
export const getTestimonials = () => readData('testimonials.json');
export const saveTestimonials = (testimonials) => writeData('testimonials.json', testimonials);

// Blogs
export const getBlogs = () => readData('blogs.json');
export const saveBlogs = (blogs) => writeData('blogs.json', blogs);
export const getBlogBySlug = async (slug) => {
  const blogs = await getBlogs();
  return blogs.find(blog => blog.slug === slug);
};

// Success Stories
export const getSuccessStories = () => readData('success-stories.json');
export const saveSuccessStories = (stories) => writeData('success-stories.json', stories);

// Features
export const getFeatures = () => readData('features.json');
export const saveFeatures = (features) => writeData('features.json', features);

// FAQs
export const getFAQs = () => readData('faqs.json');
export const saveFAQs = (faqs) => writeData('faqs.json', faqs);

// Hero
export const getHeroSlides = () => readData('hero.json');
export const saveHeroSlides = (slides) => writeData('hero.json', slides);

// Navigation
export const getNavigation = () => readData('navigation.json');
export const saveNavigation = (navigation) => writeData('navigation.json', navigation);

// Services
export const getServices = () => readData('services.json');
export const saveServices = (services) => writeData('services.json', services);
export const getServiceBySlug = async (slug) => {
  const services = await getServices();
  return services.find(service => service.slug === slug);
};
