// server/models/Room.js

const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
    unique: true
  },

  price: {
    type: Number,
    required: true
  },

  image: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  guests: {
    type: Number,
    required: true
  },

  amenities: {
    type: [String],
    default: []
  }

}, { timestamps: true });


// ✅ prevent overwrite error
module.exports =
  mongoose.models.Room ||
  mongoose.model("Room", roomSchema);