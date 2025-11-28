require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  const passwordHash = await bcrypt.hash("StrongPassword123!", 10);
  const u = new User({ email: "admin@ecnafrica.org", passwordHash, name: "Admin" });
  await u.save();
  console.log("Admin created");
  process.exit(0);
}
run().catch(err=>{console.error(err);process.exit(1)});
