const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendBookingEmail = async (booking) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: booking.email,
      subject: "Booking Confirmed - Amma Homestay",
      html: `
        <h2>Booking Confirmed</h2>
        <p>Name: ${booking.fullName}</p>
        <p>Room: ${booking.roomName}</p>
        <p>Check-in: ${booking.checkIn}</p>
        <p>Check-out: ${booking.checkOut}</p>
        <p>Status: Confirmed</p>
      `,
    });

    console.log("Email sent");
  } catch (error) {
    console.log("Email error:", error);
  }
};

module.exports = sendBookingEmail;