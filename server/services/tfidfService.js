const natural = require("natural");

function calculateTFIDF(resumeText, jobDescription) {
  const tfidf = new natural.TfIdf();

  tfidf.addDocument(resumeText.toLowerCase());
  tfidf.addDocument(jobDescription.toLowerCase());

  const resumeTerms = {};
  const jobTerms = {};

  tfidf.listTerms(0).forEach((item) => {
    resumeTerms[item.term] = item.tfidf;
  });

  tfidf.listTerms(1).forEach((item) => {
    jobTerms[item.term] = item.tfidf;
  });

  const allTerms = new Set([
    ...Object.keys(resumeTerms),
    ...Object.keys(jobTerms),
  ]);

  let dotProduct = 0;
  let resumeMagnitude = 0;
  let jobMagnitude = 0;

  allTerms.forEach((term) => {
    const resumeValue = resumeTerms[term] || 0;
    const jobValue = jobTerms[term] || 0;

    dotProduct += resumeValue * jobValue;

    resumeMagnitude += resumeValue * resumeValue;
    jobMagnitude += jobValue * jobValue;
  });

  if (resumeMagnitude === 0 || jobMagnitude === 0) {
    return 0;
  }

  const similarity =
    dotProduct /
    (Math.sqrt(resumeMagnitude) * Math.sqrt(jobMagnitude));

  return Number((similarity * 100).toFixed(2));
}

module.exports = {
  calculateTFIDF,
};