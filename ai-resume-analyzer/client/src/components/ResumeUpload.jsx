import { useState } from "react";
import axios from "axios";

function ResumeUpload({ setAnalysis }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setMessage("");
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a PDF resume");
      return;
    }

    if (!file.name.toLowerCase().endsWith(".pdf")) {
      setMessage("Please select a PDF file");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    try {
      setLoading(true);
      setMessage("");

      const response = await axios.post(
        "http://localhost:5000/api/resume/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setAnalysis(response.data.analysis);

      setMessage("Resume analyzed successfully!");

    } catch (error) {
      console.error(error);

      setMessage(
        error.response?.data?.message ||
        "Resume analysis failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-container">

      <h2>AI Resume Analyzer</h2>

      <p>
        Upload your resume and get an AI-powered analysis.
      </p>

      <div className="upload-box">

        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
        />

        {file && (
          <p className="file-name">
            Selected: {file.name}
          </p>
        )}

        <button
          onClick={handleUpload}
          disabled={loading}
        >
          {loading ? "Analyzing Resume..." : "Analyze Resume"}
        </button>

        {message && (
          <p className="message">
            {message}
          </p>
        )}

      </div>

    </div>
  );
}

export default ResumeUpload;