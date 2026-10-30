const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { PDFParse } = require("pdf-parse");

const { analyzeResume } = require("../services/geminiService");

const router = express.Router();

// ==========================================
// UPLOAD FOLDER
// ==========================================

const uploadDir = path.join(__dirname, "..", "uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// ==========================================
// MULTER CONFIGURATION
// ==========================================

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
});

// ==========================================
// UPLOAD + ANALYZE RESUME
// ==========================================

router.post(
  "/upload",
  upload.single("resume"),
  async (req, res) => {
    try {
      // ------------------------------------------
      // CHECK FILE
      // ------------------------------------------

      if (!req.file) {
        return res.status(400).json({
          message: "Please upload a resume",
        });
      }

      console.log("=================================");
      console.log("Resume upload started");
      console.log("File name:", req.file.originalname);
      console.log("File type:", req.file.mimetype);
      console.log("File path:", req.file.path);
      console.log("=================================");

      // ------------------------------------------
      // CHECK FILE EXTENSION
      // ------------------------------------------

      const extension = path
        .extname(req.file.originalname)
        .toLowerCase();

      if (extension !== ".pdf") {
        // Delete uploaded non-PDF file
        fs.unlinkSync(req.file.path);

        return res.status(400).json({
          message: "Please upload a PDF file",
        });
      }

      // ------------------------------------------
      // READ PDF
      // ------------------------------------------

      const dataBuffer = fs.readFileSync(req.file.path);

      console.log("PDF read successfully");

      // ------------------------------------------
      // EXTRACT TEXT FROM PDF
      // ------------------------------------------

      const parser = new PDFParse({
        data: dataBuffer,
      });

      const result = await parser.getText();

      await parser.destroy();

      const resumeText = result.text;

      console.log("PDF text extracted successfully");
      console.log("Resume text length:", resumeText.length);

      // ------------------------------------------
      // CHECK RESUME TEXT
      // ------------------------------------------

      if (!resumeText || resumeText.trim().length === 0) {
        return res.status(400).json({
          message:
            "Could not extract text from the PDF. Please upload a text-based PDF.",
        });
      }

      // ------------------------------------------
      // SEND RESUME TO GEMINI AI
      // ------------------------------------------

      console.log("Sending resume to Gemini AI...");

      const aiAnalysis = await analyzeResume(resumeText);

      console.log("Gemini AI analysis completed successfully");

      // ------------------------------------------
      // SEND RESPONSE
      // ------------------------------------------

      res.status(200).json({
        message: "Resume analyzed successfully",

        fileName: req.file.filename,

        resumeText: resumeText,

        analysis: aiAnalysis,
      });

    } catch (error) {
      console.error("=================================");
      console.error("RESUME ANALYSIS ERROR:");
      console.error(error);
      console.error("=================================");

      res.status(500).json({
        message: "Resume analysis failed",
        error: error.message || String(error),
      });
    }
  }
);

// ==========================================
// TEST ROUTE
// ==========================================

router.get("/test", (req, res) => {
  res.json({
    message: "Resume route is working",
  });
});

// ==========================================
// EXPORT ROUTER
// ==========================================

module.exports = router;