const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function analyzeResume(resumeText) {
  const prompt = `
Analyze the following resume carefully.

Return a structured JSON analysis.

Important:
- ATS score must be an estimated score from 0 to 100.
- Consider resume structure, relevant keywords, skills, education, projects,
  experience, clarity, and completeness when estimating the ATS score.
- Do not invent information that is not present in the resume.
- Separate technical skills and soft skills.
- Give useful strengths, weaknesses and improvement suggestions.
- Recommend suitable job roles based on the candidate's skills and background.

Resume:
${resumeText}
`;

  const config = {
    responseMimeType: "application/json",

    responseSchema: {
      type: "object",

      properties: {
        atsScore: {
          type: "number",
        },

        summary: {
          type: "string",
        },

        technicalSkills: {
          type: "array",
          items: {
            type: "string",
          },
        },

        softSkills: {
          type: "array",
          items: {
            type: "string",
          },
        },

        strengths: {
          type: "array",
          items: {
            type: "string",
          },
        },

        weaknesses: {
          type: "array",
          items: {
            type: "string",
          },
        },

        missingSkills: {
          type: "array",
          items: {
            type: "string",
          },
        },

        recommendedJobRoles: {
          type: "array",
          items: {
            type: "string",
          },
        },

        improvementSuggestions: {
          type: "array",
          items: {
            type: "string",
          },
        },

        education: {
          type: "array",
          items: {
            type: "string",
          },
        },

        experienceYears: {
          type: "number",
        },

        projects: {
          type: "array",
          items: {
            type: "string",
          },
        },

        certifications: {
          type: "array",
          items: {
            type: "string",
          },
        },
      },

      required: [
        "atsScore",
        "summary",
        "technicalSkills",
        "softSkills",
        "strengths",
        "weaknesses",
        "missingSkills",
        "recommendedJobRoles",
        "improvementSuggestions",
        "education",
        "experienceYears",
        "projects",
        "certifications",
      ],
    },
  };

  // Models to try
  // Models to try
const models = [
  "gemini-3.6-flash",
  "gemini-3.5-flash",
];

for (const model of models) {
  for (let attempt = 1; attempt <= 4; attempt++) {
    try {
      console.log(
        `Trying Gemini model: ${model} | Attempt: ${attempt}/4`
      );

      const response = await ai.models.generateContent({
        model: model,
        contents: prompt,
        config: config,
      });

      console.log(
        `Gemini analysis successful using ${model}`
      );

      return JSON.parse(response.text);

    } catch (error) {

      console.error(
        `Gemini error | Model: ${model} | Attempt: ${attempt}`
      );

      console.error("Message:", error.message);
      console.error("Status:", error.status);
      console.error("Cause:", error?.cause?.code);

      // Detect temporary errors
      const isTemporaryError =
        error?.status === 503 ||
        error?.status === 500 ||
        error?.status === 429 ||
        error?.status === 408 ||
        error?.cause?.code === "UND_ERR_HEADERS_TIMEOUT" ||
        error?.cause?.code === "UND_ERR_CONNECT_TIMEOUT" ||
        error?.cause?.code === "ECONNRESET";

      // Retry temporary errors
      if (isTemporaryError && attempt < 4) {

        const waitTime =
          Math.pow(2, attempt - 1) * 5000;

        console.log(
          `Temporary Gemini error. Retrying in ${
            waitTime / 1000
          } seconds...`
        );

        await new Promise((resolve) =>
          setTimeout(resolve, waitTime)
        );

        continue;
      }

      // Model doesn't exist or isn't available
      if (error?.status === 404) {

        console.log(
          `${model} is unavailable. Trying next model...`
        );

        break;
      }

      // If all retries for this model fail
      if (isTemporaryError) {

        console.log(
          `All attempts failed for ${model}. Trying next model...`
        );

        break;
      }

      // Other unexpected error
      throw error;
    }
  }
}

throw new Error(
  "All Gemini models are currently unavailable. Please try again later."
);
}

module.exports = {
  analyzeResume,
};