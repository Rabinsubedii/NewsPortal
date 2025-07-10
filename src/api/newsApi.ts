const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = 'https://newsapi.org/v2';

export const fetchTopHeadlines = async () => {
  const response = await fetch(`${BASE_URL}/top-headlines?country=us&pageSize=12&apiKey=${API_KEY}`);
  if (!response.ok) throw new Error('Failed to fetch top headlines');
  const data = await response.json();
  return data.articles;
};

export const fetchSearch = async (query: string) => {
  const response = await fetch(
    `${BASE_URL}/everything?q=${encodeURIComponent(query)}&pageSize=20&apiKey=${API_KEY}`
  );
  if (!response.ok) throw new Error("Failed to fetch search results");
  const data = await response.json();
  return data.articles;
};


export const fetchCategoryHeadlines = async (category: string) => {
  const response = await fetch(
    `${BASE_URL}/top-headlines?country=us&category=${category}&pageSize=12&apiKey=${API_KEY}`
  );
  if (!response.ok) throw new Error("Failed to fetch category news");
  const data = await response.json();
  return data.articles;
};

