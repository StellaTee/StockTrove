// Define the AlphaVantageResponse interface
export interface AlphaVantageResponse {
  'Meta Data': {
    '1. Information': string; // Information about the data
    '2. Symbol': string; // The stock symbol
    '3. Last Refreshed': string; // The last time the data was refreshed
    '4. Time Zone': string; // The time zone of the data
  };
  'Time Series (5min)'?: TimeSeries; // Time series data for every 5 minutes (optional)
  'Time Series (15min)'?: TimeSeries; // Time series data for every 15 minutes (optional)
  'Time Series (30min)'?: TimeSeries; // Time series data for every 30 minutes (optional)
  'Time Series (60min)'?: TimeSeries; // Time series data for every 60 minutes (optional)
  'Time Series (Daily)'?: TimeSeries; // Daily time series data (optional)
  'Time Series (Weekly)'?: TimeSeries; // Weekly time series data (optional)
  'Time Series (Monthly)'?: TimeSeries; // Monthly time series data (optional)
  'Weekly Time Series'?: TimeSeries; // Weekly time series data (optional)
}

// Define the TimeSeries interface
interface TimeSeries {
  [key: string]: {
    '1. open': string; // The opening price of the stock
    '2. high': string; // The highest price of the stock during the trading period
    '3. low': string; // The lowest price of the stock during the trading period
    '4. close': string; // The closing price of the stock
    '5. volume': string; // The volume of the stock
  };
}