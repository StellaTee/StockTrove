import axios, { AxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
  baseURL: "https://www.alphavantage.co",
  params: {
    apikey: "ZPYWFE8LBFCNTMU1",  //API key A9Q2Y422K8VMME52  P6WXDG1SCA2KVCMV ZPYWFE8LBFCNTMU1 FWT62YD9QHWTX953
  },
});

//Not accurate for alpha vantage, the response object is different for each endpoint need to figure out a way to handle this

class AlphaAPIClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = (requestConfig: AxiosRequestConfig = {}) => {
    return axiosInstance
      .get<T>(this.endpoint, requestConfig)
      .then((res) => res.data);
  };

  // post = (data: T) => {
  //   return axiosInstance
  //     .post<T>(this.endpoint, data)
  //     .then((res) => res.data);
  // };

  // get = (id: number | string) => {
  //   return axiosInstance
  //     .get<T>(this.endpoint + "/" + id)
  //     .then((res) => res.data);
  // };
}

export default AlphaAPIClient;
