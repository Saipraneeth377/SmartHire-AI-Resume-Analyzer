const express = require("express");
const router = express.Router();

const Job = require("../models/Job");

// Convert skills into a standard format
function normalizeSkills(skills) {
  return skills
    .flatMap((skill) =>
      skill
        .toLowerCase()
        .split(/[\/,&]+/)
        .map((item) => item.trim())
    )
    .filter(Boolean);
}

// Match resume with job
router.post("/", async (req, res) => {
  try {
    const { resumeSkills, jobId } = req.body;

    // Check resume skills
    if (!resumeSkills || !Array.isArray(resumeSkills)) {
      return res.status(400).json({
        message: "resumeSkills must be an array",
      });
    }

    // Check job ID
    if (!jobId) {
      return res.status(400).json({
        message: "jobId is required",
      });
    }

    // Find job
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    // Normalize skills
    const resumeSkillsLower = normalizeSkills(resumeSkills);
    const jobSkillsLower = normalizeSkills(job.skills);

    // Find matched skills
    const matchedSkills = jobSkillsLower.filter((skill) =>
      resumeSkillsLower.includes(skill)
    );

    // Find missing skills
    const missingSkills = jobSkillsLower.filter(
      (skill) => !resumeSkillsLower.includes(skill)
    );

    // Calculate percentage
    let matchPercentage = 0;

    if (jobSkillsLower.length > 0) {
      matchPercentage = Math.round(
        (matchedSkills.length / jobSkillsLower.length) * 100
      );
    }

    // Send response
    res.status(200).json({
      message: "Job matching completed",

      job: {
        id: job._id,
        title: job.title,
        company: job.company,
        location: job.location,
      },

      matchPercentage,

      matchedSkills,

      missingSkills,
    });
  } catch (error) {
    console.error("MATCH ERROR:", error);

    res.status(500).json({
      message: "Failed to match resume with job",
      error: error.message,
    });
  }
});

// Test route
router.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "Match route is working",
  });
});

module.exports = router;