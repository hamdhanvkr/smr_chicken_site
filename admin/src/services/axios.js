import axios from "axios";

const baseURL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000/api"
    : "/api";

console.log("Axios Base URL:", baseURL);

const api = axios.create({
  baseURL,
});

export default api;