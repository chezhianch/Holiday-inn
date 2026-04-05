// src/api/paymentApi.ts

import axios from "axios";

export const createOrder = (data: any) =>
  axios.post(`${import.meta.env.VITE_API_URL}/api/payment/create-order`, data);
export const verifyPayment = (data: any) =>
  axios.post(`${import.meta.env.VITE_API_URL}/api/payment/verify-payment`, data);