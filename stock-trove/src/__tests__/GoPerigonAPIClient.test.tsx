import GoPerigonAPIClient from "../servicies/GoPerigonAPIClient";

import { Article } from "../entities/Article";

// ... (import statements for other dependencies)

const articlesService = new GoPerigonAPIClient<Article>("/all");

describe("GoPerigon API Test Suite", () => {
  it("tests /all endpoint", async () => {
    // Make a request to your GoPerigon service
    const response = await articlesService.getAll({});

    // Assuming your service returns an array of articles
    const { status, numResults, articles } = response;

    // Log the relevant information
    console.log("Status:", status);
    console.log("Number of Results:", numResults);
    console.log("Articles:", articles);

    // Add your expectations based on the actual response structure
    expect(status).toBe(200);
    expect(numResults).toBeGreaterThan(0);
    expect(articles).toBeDefined();
    expect(Array.isArray(articles)).toBe(true);

    // Check the structure of the first article
    if (articles!.length > 0) {
      const firstArticle = articles![0];
      console.log("First Article:", firstArticle);

      // Add expectations for the first article's structure based on the Article interface
      expect(firstArticle.url).toBeDefined();
      expect(firstArticle.imageUrl).toBeDefined();
      expect(firstArticle.description).toBeDefined();
      expect(firstArticle.content).toBeDefined();
      expect(firstArticle.title).toBeDefined();
      expect(firstArticle.sentiment).toBeDefined();
      expect(firstArticle.sentiment.positive).toBeDefined();
      expect(firstArticle.sentiment.negative).toBeDefined();
      expect(firstArticle.sentiment.neutral).toBeDefined();
      expect(firstArticle.keywords).toBeDefined();
      expect(Array.isArray(firstArticle.keywords)).toBe(true);
      expect(firstArticle.keywords.length).toBeGreaterThan(0);
      expect(firstArticle.keywords[0].name).toBeDefined();
      expect(firstArticle.keywords[0].weight).toBeDefined();
      expect(firstArticle.summary).toBeDefined();
    } else {
      console.error("No articles found");
    }
  });

  // Insert other tests below this line

  // Insert other tests above this line
});
