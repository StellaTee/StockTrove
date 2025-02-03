import axios, { AxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.polygon.io/v2/aggs/ticker",
  params: {
    adjusted: "true",
    sort: "asc",
    limit: "120",
    apiKey: "97wY6PVRt8dVs7yxeuwkqFVEuK2eJg5d",  //API key O5EacZ0ujwwaL04SfJ37ufSa4m1dKQ8p 3vPDdiOJhagMeRUO6Acu5WRBE6dZSsTZ
  },
});

//Not accurate for alpha vantage, the response object is different for each endpoint need to figure out a way to handle this

class PolygonAPIClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = (requestConfig: AxiosRequestConfig = {}) => {
    return axiosInstance
      .get<T>(this.endpoint, requestConfig)
      .then((res) => res.data);
  };

}

export default PolygonAPIClient;

