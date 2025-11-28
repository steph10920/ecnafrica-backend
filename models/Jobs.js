const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: String,
  type: String,
  salaryRange: String,
  aboutRole: String,
  responsibilities: [String],
  qualifications: [String],
  apply: String,
  datePosted: { type: Date, default: Date.now },
  closingDate: Date,
  status: { type: String, enum: ["open", "closed"], default: "open" },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

module.exports = mongoose.model("Job", jobSchema);
