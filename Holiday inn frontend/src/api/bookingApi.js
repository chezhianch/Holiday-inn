// ==========================================
// CREATE BOOKING
// ==========================================
export const createBooking = async (bookingData) => {

  try {

    const res = await fetch("http://localhost:5000/api/bookings", {

      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(bookingData),

    });

    const data = await res.json();

    return data;

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
      `http://localhost:5000/api/bookings/availability/${encodeURIComponent(roomName)}`
    );

    const data = await res.json();

    return data;

  } catch (error) {

    console.error("availability error:", error);

    return {
      success: false,
      bookings: []
    };

  }

};