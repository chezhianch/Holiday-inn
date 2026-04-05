const API_BASE = `${import.meta.env.VITE_API_URL}/api/admin`;

// =======================
// ADMIN LOGIN
// =======================
export const adminLogin = async (email: string, password: string) => {
  try {
    const res = await fetch(`${API_BASE}/login`, {
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

  } catch (error) {
    console.error("Login Error:", error);
    return { success: false, message: "Login failed" };
  }
};

// =======================
// GET BOOKINGS (ADMIN)
// =======================
export const getBookings = async () => {
  try {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      return { success: false, message: "No token" };
    }

    const res = await fetch(`${API_BASE}/bookings`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });

    return await res.json();

  } catch (error) {
    console.error("Fetch Bookings Error:", error);
    return { success: false, message: "Failed to fetch bookings" };
  }
};