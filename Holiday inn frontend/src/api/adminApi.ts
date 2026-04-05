const API_BASE = `${import.meta.env.VITE_API_URL}/api/admin`;

// ADMIN LOGIN
export const adminLogin = async (email: string, password: string) => {

  const res = await fetch(`${API_BASE}/login`, {   // ✅ FIXED HERE
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

  const res = await fetch(`${API_BASE}/bookings`, {   // ✅ FIXED HERE
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  });

  return await res.json();
};