const mongoose = require("mongoose");

const matchResultSchema = new mongoose.Schema(
  {
    resumeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
      required: true,
    },

    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },

    tfidfScore: {
      type: Number,
      default: 0,
    },

    qualificationScore: {
      type: Number,
      default: 0,
    },

    aiScore: {
      type: Number,
      default: 0,
    },

    hybridScore: {
      type: Number,
      default: 0,
    },

    matchedSkills: {
      type: [String],
      default: [],
    },

    missingSkills: {
      type: [String],
      default: [],
    },

    classification: {
      type: String,
      enum: ["Strong Match", "Review", "Low Match"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("MatchResult", matchResultSchema);
