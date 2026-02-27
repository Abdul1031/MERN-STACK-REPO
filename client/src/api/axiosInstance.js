import axios from "axios";

// In production, the API is served from the same origin (relative URL)
// In development, use the local Express dev server
const baseURL =
  import.meta.env.PROD
    ? "/api"
    : "http://localhost:5000/api";

const api = axios.create({
  baseURL,
  withCredentials: true,
});

export default api;
