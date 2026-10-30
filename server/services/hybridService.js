function calculateHybridScore(
  tfidfScore,
  qualificationScore,
  aiScore
) {
  const hybridScore =
    tfidfScore * 0.4 +
    qualificationScore * 0.4 +
    aiScore * 0.2;

  return Number(hybridScore.toFixed(2));
}

function classifyCandidate(score) {
  if (score >= 80) {
    return "Strong Match";
  }

  if (score >= 60) {
    return "Review";
  }

  return "Low Match";
}

module.exports = {
  calculateHybridScore,
  classifyCandidate,
};