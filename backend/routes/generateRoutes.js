const express = require("express")
const router = express.Router()

const { generateResume, downloadResume } = require("../controllers/generateController")
const authMiddleware = require("../middleware/authMiddleware")

router.get("/resume/:id", authMiddleware, generateResume)
router.get("/download/:id", downloadResume)

module.exports = router