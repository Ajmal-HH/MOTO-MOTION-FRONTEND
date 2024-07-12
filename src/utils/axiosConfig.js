import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

console.log(BASE_URL,"BASE_url..");
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
    (config) => {
      // const token = Cookies.get("jwt"); 
      const token =  localStorage.getItem("token");
      console.log(token, "Token from cookie");

      
      if (token) {
        config.headers["Authorization"] = "Bearer " + token;
      }
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );

export default axiosInstance;
