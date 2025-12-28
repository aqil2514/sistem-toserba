import axios from "axios";
import { SERVER_URL } from "@/constants/url";

export const api = axios.create({
  baseURL: SERVER_URL,
  withCredentials: true,
});
