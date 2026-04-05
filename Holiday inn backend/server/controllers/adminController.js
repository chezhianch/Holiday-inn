const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs"); // ✅ ADD THIS
const Admin = require("../models/Admin");

const adminLogin = async (req, res) => {

  try {

    const { email, password } = req.body;

    // find admin
    const admin = await Admin.findOne({
      email: email.toLowerCase()
    });

    if (!admin) {
      return res.json({
        success: false,
        message: "Admin not found"
      });
    }

    // ✅ CORRECT password check using bcrypt
    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.json({
        success: false,
        message: "Invalid password"
      });
    }

    // create token
    const token = jwt.sign(
      { id: admin._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      success: true,
      token
    });

  }
  catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message: "Server error"
    });

  }

};

module.exports = { adminLogin };