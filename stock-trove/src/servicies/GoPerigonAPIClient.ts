import axios, { AxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.goperigon.com/v1",
  params: {
    //apiKey: "84595ad1-2777-4881-b1ad-9a43f5bc08e1",
    //apiKey: "f7711f23-79ef-49cc-9967-ae0663236f99",
    apiKey: "d04a4586-7f37-4d57-a9a2-6cf64ea6ca33",
    //apiKey: "441452f8-543d-4f1d-8bfb-abc0d66194b5",
  },
});

export interface FetchResponse<T> {
  status: number;
  numResults: number;
  results: T[] | null;
  articles: T[] | null;
  //for /All enpoint the results field is called "articles" for some reason which messes up the fetchResponse object, I have to also include an articles field in the response object, along with the normal "results"
}

class APIClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = (requestConfig: AxiosRequestConfig = {}) => {
    return axiosInstance
      .get<FetchResponse<T>>(this.endpoint, requestConfig)
      .then((res) => res.data);
  };
  
}

export default APIClient;
