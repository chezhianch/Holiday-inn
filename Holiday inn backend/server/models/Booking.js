const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({

  roomName: {
    type: String,
    required: true
  },

  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  },

  phone: {
    type: String,
    required: true
  },

  guests: {
    type: Number,
    required: true
  },

  checkIn: {
    type: Date,
    required: true
  },

  checkOut: {
    type: Date,
    required: true
  },

  paymentId: String,

  orderId: String,

  status: {
    type: String,
    default: "Pending"
  }

}, { timestamps: true });

module.exports =
  mongoose.models.Booking ||
  mongoose.model("Booking", bookingSchema);