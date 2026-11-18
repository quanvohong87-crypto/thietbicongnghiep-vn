/**
 * ITC Technology - Frontend API Client
 * Clean REST API client communicating with backend
 */

const API_BASE = '/api';

export const api = {
  // Products
  async getProducts(params = {}) {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/products${query ? '?' + query : ''}`);
    return res.json();
  },

  async getProduct(idOrSlug) {
    const res = await fetch(`${API_BASE}/products/${idOrSlug}`);
    return res.json();
  },

  // Categories
  async getCategories() {
    const res = await fetch(`${API_BASE}/categories`);
    return res.json();
  },

  // Articles
  async getArticles(params = {}) {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/articles${query ? '?' + query : ''}`);
    return res.json();
  },

  async getArticle(idOrSlug) {
    const res = await fetch(`${API_BASE}/articles/${idOrSlug}`);
    return res.json();
  },

  // Quotes / RFQ
  async submitQuote(quoteData) {
    const res = await fetch(`${API_BASE}/quotes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(quoteData)
    });
    return res.json();
  },

  // Settings
  async getSettings() {
    const res = await fetch(`${API_BASE}/settings`);
    return res.json();
  }
};
