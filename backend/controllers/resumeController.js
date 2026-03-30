const Resume = require("../models/Resume")

// CREATE RESUME
const createResume = async (req, res) => {

  try {

    const { name, email, phone, skills, education, experience, projects } = req.body;

    const resume = await Resume.create({
      user: req.user.id,
      name,
      email,
      phone,
      skills,
      education,
      experience,
      projects
    });

    res.json({ resume });

  } catch (error) {

    res.status(500).json({ message: "Error creating resume" });

  }

};

// GET ALL RESUMES
const getResumes = async (req,res) => {

  try{

    const resumes = await Resume.find({ user: req.user.id });

    res.json(resumes);

  }catch(error){

    res.status(500).json({message:"Error fetching resumes"});

  }

};

// GET MY LATEST RESUME
const getMyResume = async (req, res) => {

  try {

    const resume = await Resume.findOne({ user: req.user.id }).sort({ createdAt:-1 });

    if (!resume) {
      return res.status(404).json({ message:"Resume not found" });
    }

    res.json(resume);

  } catch (error) {

    res.status(500).json({ message:"Server error" });

  }
z
};

// GET SINGLE RESUME
const getResumeById = async (req, res) => {

  try {

    const resume = await Resume.findById(req.params.id)

    if (!resume) {
      return res.status(404).json({ message:"Resume not found" })
    }

    res.json(resume)

  } catch (error) {

    res.status(500).json({ message:"Server error" })

  }

}

// update resume
const updateResume = async (req, res) => {

  try {

    const resume = await Resume.findByIdAndUpdate(
      req.params.id,   // resume id from URL
      req.body,        // new data from frontend
      { new: true }    // return updated document
    );

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found"
      });
    }

    res.json({
      message: "Resume updated successfully",
      resume
    });

  } catch (error) {

    res.status(500).json({
      message: "Server error"
    });

  }

};

// DELETE RESUME
const deleteResume = async (req, res) => {

  try {

    await Resume.findByIdAndDelete(req.params.id)

    res.json({ message:"Resume deleted" })

  } catch (error) {

    res.status(500).json({ message:"Server error" })

  }

}

module.exports = { createResume, getResumes, getMyResume, getResumeById, updateResume, deleteResume }