import axios from "axios";

const api = axios.create({
  baseURL: "https://maps.googleapis.com/maps/api/geocode/json",
});

export default api;
