import { useState } from "react";

import ResumeUpload from "./components/ResumeUpload";
import AnalysisResult from "./components/AnalysisResult";
import Jobs from "./components/Jobs";

import "./App.css";

function App() {
  const [analysis, setAnalysis] = useState(null);

  const resumeSkills =
    analysis?.analysis?.technicalSkills || [];

  return (
    <div className="app">

      {/* Navigation Bar */}
      <header className="navbar">

        <div className="logo">
          SmartHire
        </div>

        <nav className="nav-links">
          <a href="#home">Home</a>
          <a href="#upload">Resume</a>
          <a href="#analysis">Analysis</a>
          <a href="#jobs">Jobs</a>
        </nav>

      </header>


      {/* Hero Section */}
      <section id="home" className="hero-section">

        <div className="hero-content">

          <h1>
            SmartHire
          </h1>

          <h2>
            AI-Powered Resume Analysis
            <br />
            & Job Matching
          </h2>

          <p>
            Analyze your resume, discover your skills,
            identify skill gaps, and find jobs that match
            your profile using Artificial Intelligence.
          </p>

          <a
            href="#upload"
            className="hero-button"
          >
            Analyze My Resume
          </a>

        </div>

      </section>


      {/* Resume Upload */}
      <section id="upload" className="page-section">

        <ResumeUpload
          setAnalysis={setAnalysis}
        />

      </section>


      {/* Resume Analysis */}
      <section id="analysis">

        <AnalysisResult
          analysis={analysis}
        />

      </section>


      {/* Jobs */}
      <section id="jobs" className="page-section">

        <Jobs
          resumeSkills={resumeSkills}
        />

      </section>


      {/* Footer */}
      <footer className="footer">

        <h3>SmartHire</h3>

        <p>
          AI-Powered Resume Analysis and Job Matching
        </p>

        <p>
          Final Year B.Tech Project
        </p>

      </footer>

    </div>
  );
}

export default App;