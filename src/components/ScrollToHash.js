'use client';

import { useEffect } from 'react';

export default function ScrollToHash() {
  useEffect(() => {
    // Check if there's a hash in the URL
    if (window.location.hash === '#clanderly') {
      // Wait for content to load, then scroll
      const scrollToElement = () => {
        const element = document.getElementById('clanderly');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      };

      // Try immediately in case content is already loaded
      scrollToElement();

      // Also try after a short delay for lazy-loaded components
      setTimeout(scrollToElement, 100);
      setTimeout(scrollToElement, 500);
      setTimeout(scrollToElement, 1000);
    }

    // Listen for hash changes
    const handleHashChange = () => {
      if (window.location.hash === '#clanderly') {
        const element = document.getElementById('clanderly');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return null;
}
