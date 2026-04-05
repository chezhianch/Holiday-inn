const API_BASE = "http://localhost:5000/api/admin";


// ADMIN LOGIN
export const adminLogin = async (email: string, password: string) => {

  const res = await fetch("http://localhost:5000/api/admin/login", {

    method: "POST",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify({ email, password })

  });

  const data = await res.json();

  if (data.success && data.token) {
    localStorage.setItem("adminToken", data.token);
  }

  return data;

};




// GET BOOKINGS
export const getBookings = async () => {

  const token = localStorage.getItem("adminToken");

  if (!token) {
    return { success: false, message: "No token" };
  }

  const res = await fetch("http://localhost:5000/api/admin/bookings", {

    method: "GET",

    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }

  });

  return await res.json();

};
