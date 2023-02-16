import axios, { AxiosResponse } from "axios";
import { ApiResponseType } from "types/api.type";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(async (config) => {
  config.params = {
    ...config.params,
  };
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  }, (error) => {
    throw error;
  }
);

export default axiosClient;