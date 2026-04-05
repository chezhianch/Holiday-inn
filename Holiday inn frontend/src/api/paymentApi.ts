// src/api/paymentApi.ts

import axios from "axios";

export const createOrder = (data: any) =>
  axios.post(
    "http://localhost:5000/api/payment/create-order",
    data
  );

export const verifyPayment = (data: any) =>
  axios.post(
    "http://localhost:5000/api/payment/verify-payment",
    data
  );