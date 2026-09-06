import axios from "axios";

const API = axios.create({
  baseURL: (process.env.REACT_APP_API_URL || (process.env.NODE_ENV === "production"
    ? "https://rentease-project-brr3.onrender.com/api"
    : "http://localhost:5000/api")).trim().replace(/\/+$/, ""),
  timeout: 30000,
});

export const getAuthErrorMessage = (error) => {
  if (error.response?.data?.message) return error.response.data.message;
  if (error.code === "ECONNABORTED" || error.code === "ETIMEDOUT") {
    return "The server is taking too long to respond. It may be starting up. Please try again in a minute.";
  }
  if (!error.response || error.response.status >= 500) {
    return "Unable to reach the login service. Please try again shortly.";
  }
  return "Unable to sign in. Please try again.";
};

const authenticate = async (path, userData) => {
  const response = await API.post(path, userData);
  if (!response.data?.token || !response.data?.user?.id) {
    throw new Error("Invalid authentication response");
  }
  return response;
};

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export const loginUser = (userData) => authenticate("/auth/login", userData);

export const registerUser = (userData) => authenticate("/auth/register", userData);

export const getOrders = () => API.get("/orders");

export const createOrder = (orderData) => API.post("/orders", orderData);

export const createPaymentOrder = (amount) =>
  API.post("/payments/create-order", { amount });

export const verifyPayment = (paymentData) => API.post("/payments/verify", paymentData);

export default API;
