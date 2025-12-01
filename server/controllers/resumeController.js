import imagekit from "../configs/imagekit.js";
import Resume from "../models/Resume.js";
import fs from "fs";

// creating new Resume
export const createResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { title } = req.body;

    // create new resume
    const newResume = await Resume.create({
      userId,
      title,
    });

    return res
      .status(201)
      .json({ message: "Resume created successfully", resume: newResume });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error creating resume", error: error.message });
  }
};

// deleting a resume
export const deleteResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId } = req.params;

    // find and delete resume
    const resume = await Resume.findOneAndDelete({ userId, _id: resumeId });
    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    return res.status(200).json({ message: "Resume deleted successfully" });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error deleting resume", error: error.message });
  }
};

// get user resume by id
export const getResumeById = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId } = req.params;
    const resume = await Resume.findOne({ userId, _id: resumeId });

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    resume.__v = undefined; //hide version key
    resume.createdAt = undefined;
    resume.updatedAt = undefined;

    return res.status(200).json({ resume });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error fetching resume", error: error.message });
  }
};

// get resume by id public
export const getPublicResumeById = async (req, res) => {
  try {
    const { resumeId } = req.params;
    const resume = await Resume.findOne({ public: true, _id: resumeId });

    if (!resume) {
      return res.status(404).json({ message: "Public resume not found" });
    }

    resume.__v = undefined; //hide version key
    resume.createdAt = undefined;
    resume.updatedAt = undefined;

    return res.status(200).json({ resume });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error fetching public resume", error: error.message });
  }
};



// updating a resume
export const updateResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId, resumeData, removeBackground } = req.body;
    const image = req.file;

    // Parse JSON string from frontend
    let resumeDataCopy = JSON.parse(resumeData);

    const removeBg = removeBackground === "yes";

    // Handle image upload if file exists
    if (image) {
      const imageBufferData = fs.createReadStream(image.path);

      const response = await imagekit.files.upload({
        file: imageBufferData,
        fileName: "resume.png",
        folder: "user-resumes",
        transformation: {
          pre:
            "w-300,h-300,fo-face,z-0.75" + (removeBg ? ",e-bgremove" : ""),
        },
      });

      // Ensure personal_info object exists
      resumeDataCopy.personal_info = resumeDataCopy.personal_info || {};
      resumeDataCopy.personal_info.image = response.url;
    }

    // Fetch existing resume
    const resume = await Resume.findOne({ userId, _id: resumeId });
    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    // Merge incoming data with existing resume to prevent losing fields
    resume.title = resumeDataCopy.title || resume.title;
    resume.personal_info = {
      ...resume.personal_info,
      ...(resumeDataCopy.personal_info || {}),
    };
    resume.professional_summary =
      resumeDataCopy.professional_summary ?? resume.professional_summary;
    resume.experience = resumeDataCopy.experience ?? resume.experience;
    resume.education = resumeDataCopy.education ?? resume.education;
    resume.project = resumeDataCopy.project ?? resume.project;
    resume.skills = resumeDataCopy.skills ?? resume.skills;
    resume.template = resumeDataCopy.template || resume.template;
    resume.accent_color = resumeDataCopy.accent_color || resume.accent_color;
    resume.public =
      typeof resumeDataCopy.public === "boolean"
        ? resumeDataCopy.public
        : resume.public;

    // Save updated resume
    await resume.save();

    return res.status(200).json({
      message: "saved successfully",
      resume,
    });
  } catch (error) {
    console.error("Error updating resume:", error);
    return res.status(400).json({
      message: "Error updating resume",
      error: error.message,
    });
  }
};


