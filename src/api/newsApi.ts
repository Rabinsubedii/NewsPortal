const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = 'https://gnews.io/api/v4';

export const fetchTopHeadlines = async () => {
  const response = await fetch(`${BASE_URL}/top-headlines?lang=en&country=us&max=12&apikey=${API_KEY}`);
  if (!response.ok) throw new Error('Failed to fetch top headlines');
  const data = await response.json();
  return data.articles;
};

export const fetchSearch = async (query: string) => {
  const response = await fetch(
    `${BASE_URL}/search?q=${encodeURIComponent(query)}&lang=en&max=20&apikey=${API_KEY}`
  );
  if (!response.ok) throw new Error("Failed to fetch search results");
  const data = await response.json();
  return data.articles;
};

export const fetchCategoryHeadlines = async (category: string) => { 
  const response = await fetch(
    `${BASE_URL}/top-headlines?lang=en&country=us&category=${category}&max=12&apikey=${API_KEY}`
  );
  if (!response.ok) throw new Error("Failed to fetch category news");
  const data = await response.json();
  return data.articles;
};
