const express = require("express");
const router = express.Router();

const Razorpay = require("razorpay");
const crypto = require("crypto");

const Booking = require("../models/Booking");


// INIT RAZORPAY
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});


// ===========================
// CREATE ORDER
// ===========================
router.post("/create-order", async (req, res) => {

  try {

    const {
      roomName,
      name,
      email,
      phone,
      guests,
      checkIn,
      checkOut
    } = req.body;


    if (!roomName) {

      return res.status(400).json({
        success: false,
        message: "Room name missing"
      });

    }


    const amount = 2200;


    const order = await razorpay.orders.create({

      amount: amount * 100,
      currency: "INR"

    });


    const booking = await Booking.create({

      roomName,
      name,
      email,
      phone,
      guests,
      checkIn,
      checkOut,
      orderId: order.id,
      status: "Pending"

    });


    res.json({

      success: true,
      key: process.env.RAZORPAY_KEY_ID,
      order,
      bookingId: booking._id

    });

  }
  catch (err) {

    console.log(err);

    res.status(500).json({

      success: false,
      message: "Order creation failed"

    });

  }

});

// ===========================
// VERIFY PAYMENT
// ===========================
router.post("/verify-payment", async (req, res) => {

  try {

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      bookingId
    } = req.body;


    const crypto = require("crypto");


    const body =
      razorpay_order_id + "|" + razorpay_payment_id;


    const expectedSignature =
      crypto
        .createHmac(
          "sha256",
          process.env.RAZORPAY_KEY_SECRET
        )
        .update(body)
        .digest("hex");


    if (expectedSignature !== razorpay_signature) {

      return res.status(400).json({
        success: false,
        message: "Payment verification failed"
      });

    }


    await Booking.findByIdAndUpdate(

      bookingId,

      {
        paymentId: razorpay_payment_id,
        status: "Paid"
      }

    );


    res.json({
      success: true,
      message: "Payment verified"
    });

  }
  catch (err) {

    console.log(err);

    res.status(500).json({
      success: false
    });

  }

});
module.exports = router;