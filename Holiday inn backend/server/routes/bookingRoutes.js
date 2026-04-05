const express = require("express");
const router = express.Router();

const Booking = require("../models/Booking");
const Room = require("../models/Room");


// ==============================
// GET ROOM AVAILABILITY
// ==============================

router.get("/availability/:roomName", async (req, res) => {

  try {

    const room = await Room.findOne({
      name: req.params.roomName
    });

    if (!room) {
      return res.status(200).json({
        success: true,
        bookings: []
      });
    }

    const bookings = await Booking.find({
      room: room._id,
      status: "confirmed"
    });

    res.status(200).json({
      success: true,
      bookings
    });

  }
  catch (err) {

    console.log("Availability error:", err);

    res.status(500).json({
      success: false,
      bookings: []
    });

  }

});

module.exports = router;