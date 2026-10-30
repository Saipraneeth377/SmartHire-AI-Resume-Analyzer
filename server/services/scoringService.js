function normalize(value) {
  return String(value || "")
    .toLowerCase()
    .trim();
}

function calculateSkillScore(candidateSkills, requiredSkills) {
  if (!requiredSkills || requiredSkills.length === 0) {
    return 100;
  }

  const candidate = candidateSkills.map(normalize);

  const required = requiredSkills.map(normalize);

  const matched = required.filter((skill) =>
    candidate.some(
      (candidateSkill) =>
        candidateSkill === skill ||
        candidateSkill.includes(skill) ||
        skill.includes(candidateSkill)
    )
  );

  return Number(((matched.length / required.length) * 100).toFixed(2));
}

function calculateExperienceScore(
  candidateExperience,
  requiredExperience
) {
  if (!requiredExperience || requiredExperience <= 0) {
    return 100;
  }

  const score =
    (candidateExperience / requiredExperience) * 100;

  return Number(Math.min(score, 100).toFixed(2));
}

function calculateEducationScore(candidateEducation, jobEducation) {
  if (!jobEducation || jobEducation.length === 0) {
    return 100;
  }

  const candidate = candidateEducation.map(normalize);

  const required = jobEducation.map(normalize);

  const matched = required.some((education) =>
    candidate.some(
      (candidateEducation) =>
        candidateEducation.includes(education) ||
        education.includes(candidateEducation)
    )
  );

  return matched ? 100 : 0;
}

function calculateQualificationScore(resumeData, jobData) {
  const skillScore = calculateSkillScore(
    resumeData.skills || [],
    jobData.requiredSkills || []
  );

  const experienceScore = calculateExperienceScore(
    resumeData.experienceYears || 0,
    jobData.experienceRequired || 0
  );

  const educationScore = calculateEducationScore(
    resumeData.education || [],
    jobData.education || []
  );

  const finalScore =
    skillScore * 0.5 +
    experienceScore * 0.3 +
    educationScore * 0.2;

  return {
    skillScore,
    experienceScore,
    educationScore,
    qualificationScore: Number(finalScore.toFixed(2)),
  };
}

function getMatchedSkills(candidateSkills, requiredSkills) {
  const candidate = candidateSkills.map(normalize);

  return requiredSkills.filter((skill) => {
    const normalized = normalize(skill);

    return candidate.some(
      (candidateSkill) =>
        candidateSkill === normalized ||
        candidateSkill.includes(normalized) ||
        normalized.includes(candidateSkill)
    );
  });
}

function getMissingSkills(candidateSkills, requiredSkills) {
  const matched = getMatchedSkills(
    candidateSkills,
    requiredSkills
  );

  return requiredSkills.filter(
    (skill) => !matched.includes(skill)
  );
}

module.exports = {
  calculateQualificationScore,
  getMatchedSkills,
  getMissingSkills,
};