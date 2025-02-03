// Define the PolygonResponse interface
export interface PolygonResponse {
    ticker: string; // The ticker symbol for the stock
    queryCount: number; // The number of queries made
    resultsCount: number; // The number of results returned
    adjusted: boolean; // Whether the results are adjusted for splits
    results: PolygonResult[]; // An array of the results
    status: string; // The status of the response
    request_id: string; // The ID of the request
    count: number; // The total count of results
}

// Define the PolygonResult interface
export interface PolygonResult {
    v: number; // The volume of the stock
    vw: number; // The volume weighted average price
    o: number; // The opening price of the stock
    c: number; // The closing price of the stock
    h: number; // The highest price of the stock during the trading period
    l: number; // The lowest price of the stock during the trading period
    t: number; // The timestamp for the trading period
    n: number; // The number of transactions
}