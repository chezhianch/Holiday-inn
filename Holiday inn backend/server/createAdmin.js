const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

require("dotenv").config({ path: __dirname + "/../.env" });

const Admin = require("./models/Admin");

mongoose.connect(process.env.MONGO_URI)
.then(async () => {

  const existingAdmin = await Admin.findOne({
    email: "admin@ammahomestay.com"
  });

  if (existingAdmin) {
    console.log("Admin already exists");
    process.exit();
  }

  // ✅ Plain password
  const plainPassword = "admin123";

  // ✅ Hash password properly
  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  await Admin.create({
    email: "admin@ammahomestay.com",
    password: hashedPassword
  });

  console.log("✅ Admin created successfully");
  console.log("Login Email: admin@123.com");
  console.log("Login Password: admin123");

  process.exit();

})
.catch(err => {
  console.log(err);
  process.exit();
});