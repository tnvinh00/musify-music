import axios, { AxiosResponse } from "axios";
import { ApiResponseType } from "types/api.type";

const axiosClient2 = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL_2,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient2.interceptors.request.use(async (config) => {
  config.params = {
    ...config.params,
  };
  return config;
});

axiosClient2.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  }, (error) => {
    throw error;
  }
);

export default axiosClient2;