import axios from "axios";

const API_BASE = `${import.meta.env.VITE_API_URL}/api/payment`;

// CREATE ORDER
export const createOrder = async (data: any) => {
  try {
    const res = await axios.post(`${API_BASE}/create-order`, data);
    return res.data;
  } catch (error) {
    console.error("Create Order Error:", error);
    return { success: false };
  }
};

// VERIFY PAYMENT
export const verifyPayment = async (data: any) => {
  try {
    const res = await axios.post(`${API_BASE}/verify-payment`, data);
    return res.data;
  } catch (error) {
    console.error("Verify Payment Error:", error);
    return { success: false };
  }
};