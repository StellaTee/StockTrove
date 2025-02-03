// Define the Company interface
export interface Company {
    slug: any; // A unique identifier for the company
    id: string; // The company's ID
    name: string; // The company's name
    domains: string[]; // An array of the company's domains
    globalRank: number; // The company's global rank
    description: string; // A description of the company
    ceo: string; // The company's CEO
    industry: string; // The industry the company operates in
    logo: string; // The URL of the company's logo
    favicon: string; // The URL of the company's favicon
    fullTimeEmployees: number; // The number of full-time employees at the company
    symbols: { // An array of the company's stock symbols
        symbol: string; // The stock symbol
        exchange: string; // The exchange the stock is traded on
        exchangeShortName: string; // The short name of the exchange
    }[]
}