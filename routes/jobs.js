const express = require("express");
const router = express.Router();
const Job = require("../models/Job");
const auth = require("../middleware/auth");

// Public: get jobs (open by default)
router.get("/", async (req, res) => {
  try {
    const showAll = req.query.showAll === "true";
    const filter = showAll ? {} : { status: "open" };
    const jobs = await Job.find(filter).sort({ datePosted: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Not found" });
    res.json(job);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const payload = req.body;
    if (typeof payload.responsibilities === "string") {
      payload.responsibilities = payload.responsibilities.split("|").map(s => s.trim()).filter(Boolean);
    }
    if (typeof payload.qualifications === "string") {
      payload.qualifications = payload.qualifications.split("|").map(s => s.trim()).filter(Boolean);
    }
    payload.createdBy = req.user._id;
    if (payload.closingDate) payload.closingDate = new Date(payload.closingDate);
    const job = new Job(payload);
    await job.save();
    res.status(201).json(job);
  } catch (err) {
    res.status(400).json({ message: "Bad request", error: err.message });
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    const update = req.body;
    if (update.closingDate) update.closingDate = new Date(update.closingDate);
    if (update.status && !["open", "closed"].includes(update.status)) {
      return res.status(400).json({ message: "Invalid status" });
    }
    const job = await Job.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!job) return res.status(404).json({ message: "Not found" });
    res.json(job);
  } catch (err) {
    res.status(400).json({ message: "Bad request" });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/:id/toggle", auth, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Not found" });
    job.status = job.status === "open" ? "closed" : "open";
    await job.save();
    res.json(job);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
