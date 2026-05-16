import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export const loginUser = (userData) => API.post("/auth/login", userData);

export const registerUser = (userData) => API.post("/auth/register", userData);

export const getOrders = () => API.get("/orders");

export const createOrder = (orderData) => API.post("/orders", orderData);

export const createPaymentOrder = (amount) =>
  API.post("/payments/create-order", { amount });

export const verifyPayment = (paymentData) => API.post("/payments/verify", paymentData);

export default API;
