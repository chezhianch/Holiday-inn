const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const paymentRoutes = require("./routes/paymentRoutes");


// =======================
// MIDDLEWARE
// =======================
app.use(cors());
app.use(express.json());

app.use("/api/payment", paymentRoutes);

// =======================
// ROUTES
// =======================

// Booking Routes
const bookingRoutes = require("./routes/bookingRoutes");
app.use("/api/bookings", bookingRoutes);

// ✅ Admin Routes (NEW)
const adminRoutes = require("./routes/adminRoutes");
app.use("/api/admin", adminRoutes);


// =======================
// DATABASE CONNECTION
// =======================
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ Mongo Error:", err));


// =======================
// SERVER START
// =======================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
