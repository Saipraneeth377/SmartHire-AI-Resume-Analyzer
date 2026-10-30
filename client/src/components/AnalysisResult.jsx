function AnalysisResult({ analysis }) {
  if (!analysis) {
    return null;
  }

  const result = analysis.analysis || {};

  const atsScore = result.atsScore ?? 0;

  const technicalSkills = result.technicalSkills || [];
  const softSkills = result.softSkills || [];
  const strengths = result.strengths || [];
  const weaknesses = result.weaknesses || [];
  const missingSkills = result.missingSkills || [];
  const projects = result.projects || [];
  const certifications = result.certifications || [];

  return (
    <div className="analysis-container">

      <h2 className="section-title">
        Resume Analysis
      </h2>

      {/* ================= ATS DASHBOARD ================= */}

      <div className="ats-dashboard">

        {/* Circular ATS Score */}

        <div className="ats-score-container">

          <div
            className="ats-circle"
            style={{
              "--score": `${atsScore * 3.6}deg`,
            }}
          >
            <div className="ats-circle-inner">

              <span className="ats-number">
                {atsScore}
              </span>

              <span className="ats-total">
                / 100
              </span>

            </div>
          </div>

          <h3>ATS Score</h3>

          <p>
            Estimated resume compatibility
          </p>

        </div>


        {/* Resume Statistics */}

        <div className="resume-statistics">

          <div className="stat-card">

            <span className="stat-number">
              {technicalSkills.length}
            </span>

            <span className="stat-label">
              Technical Skills
            </span>

          </div>


          <div className="stat-card">

            <span className="stat-number">
              {softSkills.length}
            </span>

            <span className="stat-label">
              Soft Skills
            </span>

          </div>


          <div className="stat-card">

            <span className="stat-number">
              {projects.length}
            </span>

            <span className="stat-label">
              Projects
            </span>

          </div>


          <div className="stat-card">

            <span className="stat-number">
              {certifications.length}
            </span>

            <span className="stat-label">
              Certifications
            </span>

          </div>

        </div>

      </div>


      {/* ================= SUMMARY ================= */}

      <div className="analysis-card">

        <h3>
          Professional Summary
        </h3>

        <p>
          {result.summary ||
            "No summary available."}
        </p>

      </div>


      {/* ================= TECHNICAL SKILLS ================= */}

      <div className="analysis-card">

        <h3>
          Technical Skills
        </h3>

        <div className="analysis-tags">

          {technicalSkills.length > 0 ? (
            technicalSkills.map(
              (skill, index) => (
                <span
                  className="technical-tag"
                  key={index}
                >
                  {skill}
                </span>
              )
            )
          ) : (
            <p>No technical skills found.</p>
          )}

        </div>

      </div>


      {/* ================= SOFT SKILLS ================= */}

      <div className="analysis-card">

        <h3>
          Soft Skills
        </h3>

        <div className="analysis-tags">

          {softSkills.length > 0 ? (
            softSkills.map(
              (skill, index) => (
                <span
                  className="soft-tag"
                  key={index}
                >
                  {skill}
                </span>
              )
            )
          ) : (
            <p>No soft skills found.</p>
          )}

        </div>

      </div>


      {/* ================= STRENGTHS ================= */}

      <div className="analysis-card">

        <h3>
          💪 Strengths
        </h3>

        {strengths.length > 0 ? (
          <ul>

            {strengths.map(
              (strength, index) => (
                <li key={index}>
                  {strength}
                </li>
              )
            )}

          </ul>
        ) : (
          <p>No strengths found.</p>
        )}

      </div>


      {/* ================= WEAKNESSES ================= */}

      <div className="analysis-card">

        <h3>
          ⚠️ Weaknesses
        </h3>

        {weaknesses.length > 0 ? (
          <ul>

            {weaknesses.map(
              (weakness, index) => (
                <li key={index}>
                  {weakness}
                </li>
              )
            )}

          </ul>
        ) : (
          <p>No weaknesses found.</p>
        )}

      </div>


      {/* ================= MISSING SKILLS ================= */}

      <div className="analysis-card">

        <h3>
          Missing Skills
        </h3>

        <div className="analysis-tags">

          {missingSkills.length > 0 ? (
            missingSkills.map(
              (skill, index) => (
                <span
                  className="missing-tag"
                  key={index}
                >
                  {skill}
                </span>
              )
            )
          ) : (
            <p>
              No missing skills found 🎉
            </p>
          )}

        </div>

      </div>


      {/* ================= JOB ROLES ================= */}

      <div className="analysis-card">

        <h3>
          Recommended Job Roles
        </h3>

        {result.recommendedJobRoles?.length > 0 ? (
          <ul>

            {result.recommendedJobRoles.map(
              (role, index) => (
                <li key={index}>
                  {role}
                </li>
              )
            )}

          </ul>
        ) : (
          <p>
            No recommended roles found.
          </p>
        )}

      </div>


      {/* ================= IMPROVEMENTS ================= */}

      <div className="analysis-card">

        <h3>
          Resume Improvement Suggestions
        </h3>

        {result.improvementSuggestions?.length > 0 ? (
          <ul>

            {result.improvementSuggestions.map(
              (suggestion, index) => (
                <li key={index}>
                  {suggestion}
                </li>
              )
            )}

          </ul>
        ) : (
          <p>
            No improvement suggestions found.
          </p>
        )}

      </div>


      {/* ================= EDUCATION ================= */}

      <div className="analysis-card">

        <h3>
          Education
        </h3>

        {result.education?.length > 0 ? (
          <ul>

            {result.education.map(
              (education, index) => (
                <li key={index}>
                  {education}
                </li>
              )
            )}

          </ul>
        ) : (
          <p>
            No education information found.
          </p>
        )}

      </div>


      {/* ================= EXPERIENCE ================= */}

      <div className="analysis-card">

        <h3>
          Experience
        </h3>

        <p>
          {result.experienceYears ?? 0} years
        </p>

      </div>


      {/* ================= PROJECTS ================= */}

      <div className="analysis-card">

        <h3>
          Projects
        </h3>

        {projects.length > 0 ? (
          <ul>

            {projects.map(
              (project, index) => (
                <li key={index}>
                  {project}
                </li>
              )
            )}

          </ul>
        ) : (
          <p>
            No projects found.
          </p>
        )}

      </div>


      {/* ================= CERTIFICATIONS ================= */}

      <div className="analysis-card">

        <h3>
          Certifications
        </h3>

        {certifications.length > 0 ? (
          <ul>

            {certifications.map(
              (certification, index) => (
                <li key={index}>
                  {certification}
                </li>
              )
            )}

          </ul>
        ) : (
          <p>
            No certifications found.
          </p>
        )}

      </div>

    </div>
  );
}

export default AnalysisResult;