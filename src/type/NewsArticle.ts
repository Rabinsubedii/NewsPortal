// src/types/NewsArticle.ts
export type NewsArticle = {
  title: string;
  description: string;
  url: string;
  image: string;
  source: {
    name: string;
  };
  publishedAt: string;
};
