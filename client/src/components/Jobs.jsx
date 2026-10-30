import { useEffect, useState } from "react";
import Job from "./Job";

function Jobs({ resumeSkills }) {
  const [jobs, setJobs] = useState([]);
  const [matches, setMatches] = useState({});
  const [loading, setLoading] = useState(true);

  // Get all jobs
  useEffect(() => {
    const getJobs = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/jobs"
        );

        const data = await response.json();

        console.log("Jobs received:", data);

        setJobs(data);
      } catch (error) {
        console.error("Jobs error:", error);
      } finally {
        setLoading(false);
      }
    };

    getJobs();
  }, []);

  // Match resume with every job
  useEffect(() => {
    if (
      !resumeSkills ||
      resumeSkills.length === 0 ||
      jobs.length === 0
    ) {
      return;
    }

    const matchAllJobs = async () => {
      const results = {};

      for (const job of jobs) {
        try {
          const response = await fetch(
            "http://localhost:5000/api/match",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                resumeSkills: resumeSkills,
                jobId: job._id,
              }),
            }
          );

          const data = await response.json();

          console.log(
            `Match result for ${job.title}:`,
            data
          );

          if (response.ok) {
            results[job._id] = data;
          }
        } catch (error) {
          console.error(
            `Matching error for ${job.title}:`,
            error
          );
        }
      }

      setMatches(results);
    };

    matchAllJobs();
  }, [resumeSkills, jobs]);

  if (loading) {
    return <p>Loading jobs...</p>;
  }

  // Sort jobs from highest match to lowest match
  const sortedJobs = [...jobs].sort((a, b) => {
    const scoreA = matches[a._id]?.matchPercentage ?? -1;
    const scoreB = matches[b._id]?.matchPercentage ?? -1;

    return scoreB - scoreA;
  });

  return (
    <div>
      <h2>Available Jobs</h2>

      {sortedJobs.length === 0 ? (
        <p>No jobs available.</p>
      ) : (
        sortedJobs.map((job) => (
          <Job
            key={job._id}
            job={job}
            match={matches[job._id]}
          />
        ))
      )}
    </div>
  );
}

export default Jobs;