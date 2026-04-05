const express = require("express");
const router = express.Router();

const adminAuth = require("../middleware/authMiddleware");

const Booking = require("../models/Booking");
const Room = require("../models/Room");

const { adminLogin } = require("../controllers/adminController");

// =========================
// LOGIN
// =========================
router.post("/login", adminLogin);


// =========================
// ROOM CRUD
// =========================

// CREATE ROOM
router.post("/rooms", adminAuth, async (req, res) => {

  try {

    const { name, price, image, description, guests, amenities } = req.body;

    const room = new Room({
      name,
      price,
      image,
      description,
      guests,
      amenities
    });

    await room.save();

    res.json({ success: true, room });

  } catch (err) {

    res.status(500).json({ success: false, message: "Error creating room" });

  }

});


// GET ALL ROOMS
router.get("/rooms", adminAuth, async (req, res) => {

  try {

    const rooms = await Room.find().sort({ createdAt: -1 });

    res.json({ success: true, rooms });

  } catch {

    res.status(500).json({ success: false });

  }

});


// DELETE ROOM
router.delete("/rooms/:id", adminAuth, async (req, res) => {

  try {

    await Room.findByIdAndDelete(req.params.id);

    // ALSO delete related bookings
    await Booking.deleteMany({ room: req.params.id });

    res.json({ success: true });

  } catch {

    res.status(500).json({ success: false });

  }

});


// =========================
// BOOKINGS MANAGEMENT
// =========================

// GET BOOKINGS
// =========================
// GET BOOKINGS (FIXED)
// =========================

router.get("/bookings", adminAuth, async (req, res) => {

  try {

    const bookings = await Booking.find()
      .sort({ createdAt: -1 })
      .lean();

    const formatted = bookings.map(b => ({
      _id: b._id,
      name: b.name,
      email: b.email,
      phone: b.phone,

      roomName: b.roomName,       // ✅ important fix

      guests: b.guests,
      checkIn: b.checkIn,
      checkOut: b.checkOut,

      paymentId: b.paymentId || "-",   // ✅ show payment ID

      status: b.status || "Pending",

      createdAt: b.createdAt
    }));

    res.json({
      success: true,
      bookings: formatted
    });

  } catch (err) {

    console.log("ADMIN BOOKINGS ERROR:", err);

    res.status(500).json({
      success: false
    });

  }

});

// ACCEPT
router.put("/bookings/:id/accept", adminAuth, async (req, res) => {

  try {

    await Booking.findByIdAndUpdate(req.params.id, { status: "Accepted" });

    res.json({ success: true });

  } catch {

    res.status(500).json({ success: false });

  }

});


// REJECT
router.put("/bookings/:id/reject", adminAuth, async (req, res) => {

  try {

    await Booking.findByIdAndUpdate(req.params.id, { status: "Rejected" });

    res.json({ success: true });

  } catch {

    res.status(500).json({ success: false });

  }

});


// DELETE BOOKING
router.delete("/bookings/:id", adminAuth, async (req, res) => {

  try {

    await Booking.findByIdAndDelete(req.params.id);

    res.json({ success: true });

  } catch {

    res.status(500).json({ success: false });

  }

});

module.exports = router;