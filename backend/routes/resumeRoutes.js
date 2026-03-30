const express = require("express");
const router = express.Router();

const {
  createResume,
  getResumes,
  getMyResume,
  getResumeById,
  updateResume,
  deleteResume
} = require("../controllers/resumeController");

const authMiddleware = require("../middleware/authMiddleware");


// CREATE RESUME
// POST /api/resumes
router.post("/", authMiddleware, createResume);


// GET ALL RESUMES OF LOGGED IN USER
// GET /api/resumes
router.get("/", authMiddleware, getResumes);


// GET LATEST RESUME FOR SOP / COVER LETTER
// GET /api/resumes/my-resume
router.get("/my-resume", authMiddleware, getMyResume);


// GET SINGLE RESUME BY ID
// GET /api/resumes/:id
router.get("/:id", authMiddleware, getResumeById);


// UPDATE RESUME
// PUT /api/resumes/:id
router.put("/:id", authMiddleware, updateResume);


// DELETE RESUME
// DELETE /api/resumes/:id
router.delete("/:id", authMiddleware, deleteResume);


module.exports = router;