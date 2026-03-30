const Resume = require("../models/Resume")
const PDFDocument = require("pdfkit")

const generateResume = async (req, res) => {

  try {

    const resume = await Resume.findById(req.params.id)

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found"
      })
    }

    const resumeText = `
==============================
        RESUME
==============================

Name: ${resume.name}
Email: ${resume.email}
Phone: ${resume.phone}

Skills:
${resume.skills.join(", ")}

Education:
${resume.education}

Experience:
${resume.experience}

Projects:
${resume.projects}

==============================
`

    res.json({
      resume: resumeText
    })

  } catch (error) {

    res.status(500).json({
      message: "Server error"
    })

  }

}

//download pdf 
const downloadResume = async (req, res) => {

  try {

    const resume = await Resume.findById(req.params.id)

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found"
      })
    }

    const doc = new PDFDocument()

    res.setHeader("Content-Type", "application/pdf")
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=resume.pdf"
    )

    doc.pipe(res)

    doc.fontSize(20).text("RESUME", { align: "center" })

    doc.moveDown()

    doc.fontSize(12).text(`Name: ${resume.name}`)
    doc.text(`Email: ${resume.email}`)
    doc.text(`Phone: ${resume.phone}`)

    doc.moveDown()

    doc.text(`Skills: ${resume.skills.join(", ")}`)
    doc.text(`Education: ${resume.education}`)
    doc.text(`Experience: ${resume.experience}`)
    doc.text(`Projects: ${resume.projects}`)

    doc.end()

  } catch (error) {

    res.status(500).json({
      message: "Server error"
    })

  }

}


module.exports = { generateResume, downloadResume }