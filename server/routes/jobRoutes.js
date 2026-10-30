const express = require("express");
const router = express.Router();

const Job = require("../models/Job");
console.log("========== JOB DEBUG ==========");
console.log("Job:", Job);
console.log("Job type:", typeof Job);
console.log("Job.find type:", typeof Job.find);
console.log("================================");

// CREATE JOB
router.post("/", async (req, res) => {
  try {
    const job = new Job(req.body);
    const savedJob = await job.save();

    res.status(201).json({
      message: "Job created successfully",
      job: savedJob,
    });
  } catch (error) {
    console.error("CREATE JOB ERROR:", error);

    res.status(500).json({
      message: "Failed to create job",
      error: error.message,
    });
  }
});

// GET ALL JOBS
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });

    res.status(200).json(jobs);
  } catch (error) {
    console.error("GET JOBS ERROR:", error);

    res.status(500).json({
      message: "Failed to fetch jobs",
      error: error.message,
    });
  }
});

// GET SINGLE JOB
router.get("/:id", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    res.status(200).json(job);
  } catch (error) {
    console.error("GET SINGLE JOB ERROR:", error);

    res.status(500).json({
      message: "Failed to fetch job",
      error: error.message,
    });
  }
});

module.exports = router;