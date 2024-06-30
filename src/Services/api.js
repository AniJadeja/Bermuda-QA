import axios from "axios";
import { BASE_URL } from "../utils/config";

const bermudaAPI = axios.create({
  baseURL: BASE_URL,
});

bermudaAPI.interceptors.response.use(
  (response) => response,
  async (error) => {
    return Promise.reject(error);
  }
);

export default bermudaAPI;
