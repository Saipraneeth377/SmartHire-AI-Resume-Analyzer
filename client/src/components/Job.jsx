function Job({ job, match }) {
  const score = match?.matchPercentage ?? 0;

  return (
    <div className="job-card">

      {/* Job Header */}
      <div className="job-header">

        <div>
          <h3>{job.title}</h3>

          <p className="company-name">
            {job.company}
          </p>
        </div>

        {score >= 80 && (
          <span className="best-match">
            ⭐ Best Match
          </span>
        )}

      </div>


      {/* Job Information */}
      <div className="job-info">

        <span>📍 {job.location}</span>

        <span>💰 {job.salary}</span>

      </div>


      {/* Description */}
      <p className="job-description">
        {job.description}
      </p>


      {/* Required Skills */}
      <div className="job-section">

        <h4>Required Skills</h4>

        <div className="skill-list">

          {job.skills?.map((skill, index) => (
            <span
              className="job-skill"
              key={index}
            >
              {skill}
            </span>
          ))}

        </div>

      </div>


      {/* Match Information */}
      {match && (
        <div className="match-section">

          <div className="match-header">

            <h4>Resume Match</h4>

            <strong>
              {score}%
            </strong>

          </div>


          {/* Progress Bar */}
          <div className="progress-background">

            <div
              className="progress-fill"
              style={{
                width: `${score}%`,
              }}
            ></div>

          </div>


          {/* Matched Skills */}
          <div className="match-skills">

            <div>

              <h4>✅ Matched Skills</h4>

              {match.matchedSkills?.length > 0 ? (
                <div className="skill-list">

                  {match.matchedSkills.map(
                    (skill, index) => (
                      <span
                        className="matched-skill"
                        key={index}
                      >
                        {skill}
                      </span>
                    )
                  )}

                </div>
              ) : (
                <p>No matched skills</p>
              )}

            </div>


            {/* Missing Skills */}
            <div>

              <h4>❌ Missing Skills</h4>

              {match.missingSkills?.length > 0 ? (
                <div className="skill-list">

                  {match.missingSkills.map(
                    (skill, index) => (
                      <span
                        className="missing-skill"
                        key={index}
                      >
                        {skill}
                      </span>
                    )
                  )}

                </div>
              ) : (
                <p>No missing skills 🎉</p>
              )}

            </div>

          </div>

        </div>
      )}


      {/* Apply Button */}
      {job.applyLink && (
        <a
          href={job.applyLink}
          target="_blank"
          rel="noreferrer"
          className="apply-button"
        >
          Apply Now →
        </a>
      )}

    </div>
  );
}

export default Job;