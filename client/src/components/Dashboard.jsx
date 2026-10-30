
function Dashboard({ analysis, bestMatch }) {
  const result = analysis?.analysis || {};

  const atsScore = result.atsScore ?? 0;
  const technicalSkills = result.technicalSkills || [];
  const recommendedRoles = result.recommendedJobRoles || [];

  const bestJobScore = bestMatch?.matchPercentage ?? 0;
  const bestJobTitle = bestMatch?.job?.title || "Not available";

  const cards = [
    {
      title: "ATS Score",
      value: `${atsScore}/100`,
      description: "Estimated resume score",
      icon: "🎯",
      color: "blue",
    },
    {
      title: "Best Job Match",
      value: `${bestJobScore}%`,
      description: bestJobTitle,
      icon: "💼",
      color: "green",
    },
    {
      title: "Skills Found",
      value: technicalSkills.length,
      description: "Technical skills identified",
      icon: "🛠️",
      color: "purple",
    },
    {
      title: "Recommended Roles",
      value: recommendedRoles.length,
      description: "Suitable career roles",
      icon: "🚀",
      color: "orange",
    },
  ];

  return (
    <section className="dashboard">
      <h2 className="dashboard-title">Dashboard Overview</h2>
      <p className="dashboard-subtitle">
        Your resume performance at a glance
      </p>

      <div className="summary-grid">
        {cards.map((card) => (
          <div
            className={`summary-card ${card.color}`}
            key={card.title}
          >
            <div className="summary-card-top">
              <span className="summary-icon">{card.icon}</span>
              <span className="summary-label">{card.title}</span>
            </div>

            <h3 className="summary-value">{card.value}</h3>
            <p className="summary-description">
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Dashboard;
