import axios from "axios";

export const nextApi = axios.create({
  baseURL: "http://localhost:3000/api",
  // `${process.env.NEXT_PUBLIC_API_URL}/api`
  withCredentials: true,
});
