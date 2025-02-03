// Define the Article interface
export interface Article {
  url: string; // The URL of the article
  imageUrl: string; // The URL of the article's image
  description: string; // A description of the article
  content: string; // The content of the article
  title: string; // The title of the article
  sentiment: { // The sentiment analysis of the article
    positive: number; // The score for positive sentiment
    negative: number; // The score for negative sentiment
    neutral: number; // The score for neutral sentiment
  };
  keywords: { // An array of the article's keywords
    name: string; // The keyword
    weight: number; // The weight of the keyword
  }[];
  summary: string; // A summary of the article
}