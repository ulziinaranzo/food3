import axios from "axios";

export const api = axios.create({
  baseURL: process.env.API_URL,
});

export const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    console.log(
      "Token set in axios header:",
      api.defaults.headers.common["Authorization"]
    );
  } else {
    delete api.defaults.headers.common["Authorization"];
    console.log("Token removed from axios header");
  }
};
