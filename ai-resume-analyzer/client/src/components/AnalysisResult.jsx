function AnalysisResult({ analysis }) {
  if (!analysis) {
    return null;
  }

  return (
    <div className="analysis-container">

      <h2>Resume Analysis</h2>

      {/* ATS SCORE */}
      <div className="ats-card">
        <h3>ATS Score</h3>

        <div className="score">
          {analysis.atsScore}/100
        </div>
      </div>

      {/* SUMMARY */}
      <div className="analysis-card">
        <h3>Professional Summary</h3>
        <p>{analysis.summary}</p>
      </div>

      {/* TECHNICAL SKILLS */}
      <div className="analysis-card">
        <h3>Technical Skills</h3>

        <div className="skills">
          {analysis.technicalSkills?.map(
            (skill, index) => (
              <span key={index}>
                {skill}
              </span>
            )
          )}
        </div>
      </div>

      {/* SOFT SKILLS */}
      <div className="analysis-card">
        <h3>Soft Skills</h3>

        <ul>
          {analysis.softSkills?.map(
            (skill, index) => (
              <li key={index}>{skill}</li>
            )
          )}
        </ul>
      </div>

      {/* STRENGTHS */}
      <div className="analysis-card">
        <h3>Strengths</h3>

        <ul>
          {analysis.strengths?.map(
            (item, index) => (
              <li key={index}>{item}</li>
            )
          )}
        </ul>
      </div>

      {/* WEAKNESSES */}
      <div className="analysis-card">
        <h3>Weaknesses</h3>

        <ul>
          {analysis.weaknesses?.map(
            (item, index) => (
              <li key={index}>{item}</li>
            )
          )}
        </ul>
      </div>

      {/* MISSING SKILLS */}
      <div className="analysis-card">
        <h3>Missing Skills</h3>

        <ul>
          {analysis.missingSkills?.map(
            (skill, index) => (
              <li key={index}>{skill}</li>
            )
          )}
        </ul>
      </div>

      {/* RECOMMENDED JOBS */}
      <div className="analysis-card">
        <h3>Recommended Job Roles</h3>

        <ul>
          {analysis.recommendedRoles?.map(
            (role, index) => (
              <li key={index}>{role}</li>
            )
          )}
        </ul>
      </div>

      {/* SUGGESTIONS */}
      <div className="analysis-card">
        <h3>Resume Improvement Suggestions</h3>

        <ul>
          {analysis.suggestions?.map(
            (suggestion, index) => (
              <li key={index}>{suggestion}</li>
            )
          )}
        </ul>
      </div>

    </div>
  );
}

export default AnalysisResult;