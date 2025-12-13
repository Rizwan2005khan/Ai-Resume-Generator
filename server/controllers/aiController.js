
import Resume from "../models/Resume.js";

// controller for enhancing a resume's professional summary
import ai from "../configs/ai.js";

export const enhanceProfessionalSummary = async (req, res) => {
  try {
    const { userContent } = req.body;

    if (!userContent) {
      return res.status(400).json({ message: "User content is required" });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: userContent,
    });

    return res.status(200).json({
      enhancedContent: response.text,
    });

  } catch (error) {
    console.error("AI ERROR:", error);
    return res.status(500).json({
      message: "AI enhancement failed",
    });
  }
};


// controller for enhancing a resume's job descriptions
export const enhanceJobDescriptions = async (req, res) => {
  try {
    const { userContent } = req.body;

    if (!userContent) {
      return res.status(400).json({ message: "User content is required" });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: userContent,
    });

    return res.status(200).json({
      enhancedContent: response.text,
    });

  } catch (error) {
    console.error("AI ERROR:", error);
    return res.status(500).json({
      message: "AI enhancement failed",
    });
  }
};


// controller for uploading resume to the  database
export const uploadResume = async (req, res) => {
  try {
    const { resumeText, title } = req.body;
    const userId = req.userId;
    if (!resumeText || !title) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const systemPrompt =
      "Yor are an expert AI Agent to extract data from resume.";

    const userPrompt = `Extract data from this resume:${resumeText}
    
    Provide data in the following JSON format with no additional text before or after:

   {
    professional_summary: { type: String, default: '' },
    skills: [{ type: String }],
    personal_info: {
        image: { type: String, default: '' },
        full_name: { type: String, default: '' },
        profession: { type: String, default: '' },
        email: { type: String, default: '' },
        phone: { type: String, default: '' },
        location: { type: String, default: '' },
        linkedin: { type: String, default: '' },
        webkitURL: { type: String, default: '' },
    },
    experience: [
        {
            company: { type: String },
            position: { type: String },
            start_date: { type: Date },
            end_date: { type: Date },
            description: { type: String },
            is_current: { type: Boolean },
        }
    ],
    project: [
        {
            name: { type: String },
            type: { type: String },
            description: { type: String },
        }
    ],
    education: [
        {
            institute: { type: String },
            degree: { type: String },
            field: { type: String },
            graduation_date: {type : String},
            gpa: { type: String },
        }
    ]
   }
    `;

    const response = await ai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: userPrompt,
        },
      ],
      response_format: { type: "json_object" },
    });

    const extractedData = response.choices[0].message.content;
    const parsedData = JSON.parse(extractedData);
    const newResume = await Resume.create({ userId, title, ...parsedData });

    res.json({ resumeId: newResume._id });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};