export const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://africa-chat.onrender.com/api"
    : `${window.location.protocol}//${window.location.hostname}:8000/api`;
