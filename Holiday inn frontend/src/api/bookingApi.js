// ==========================================
// CREATE BOOKING
// ==========================================
export const createBooking = async (bookingData) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingData),
    });

    return await res.json();

  } catch (error) {
    console.error("createBooking error:", error);

    return {
      success: false,
      message: "Server error"
    };
  }
};

// ==========================================
// GET ROOM AVAILABILITY
// ==========================================
export const getRoomAvailability = async (roomName) => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/bookings/availability/${encodeURIComponent(roomName)}`
    );

    return await res.json();

  } catch (error) {
    console.error("availability error:", error);

    return {
      success: false,
      bookings: []
    };
  }
};