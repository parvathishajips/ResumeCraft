import React, { useState, useEffect } from "react";
import API from "../services/api";
import { useNavigate, useLocation } from "react-router-dom";
import ResumePreview from "../components/ResumePreview";
import "../App.css";

function ResumeBuilder() {

  const navigate = useNavigate();
  const location = useLocation();

  const template = localStorage.getItem("template");
  const resumeData = location.state;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [skills, setSkills] = useState("");
  const [education, setEducation] = useState("");
  const [experience, setExperience] = useState("");
  const [projects, setProjects] = useState("");
  const [image, setImage] = useState(""); // 🔥 NEW

  const [previewData, setPreviewData] = useState(null);
  const [resumeId, setResumeId] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ LOAD DATA (EDIT MODE)
  useEffect(() => {

    if (resumeData) {

      setName(resumeData.name || "");
      setEmail(resumeData.email || "");
      setPhone(resumeData.phone || "");

      // 🔥 SAFE SKILLS
      setSkills(
        Array.isArray(resumeData.skills)
          ? resumeData.skills.join(", ")
          : resumeData.skills || ""
      );

      setEducation(resumeData.education || "");
      setExperience(resumeData.experience || "");
      setProjects(resumeData.projects || "");
      setImage(resumeData.image || ""); // 🔥 NEW

      setResumeId(resumeData._id);
    }

  }, [resumeData]);

  // ✅ SAVE / UPDATE
  const handleSaveResume = async () => {

    setLoading(true);

    try {

      const token = localStorage.getItem("token");

      const payload = {
        name,
        email,
        phone,

        // 🔥 ALWAYS ARRAY
        skills: skills
          ? skills.split(",").map((s) => s.trim())
          : [],

        education,
        experience,
        projects,
        image // 🔥 NEW
      };

      if (resumeId) {

        await API.put(`/resumes/${resumeId}`, payload, {
          headers: { Authorization: `Bearer ${token}` }
        });

        setMessage("Resume updated successfully");

      } else {

        const res = await API.post("/resumes", payload, {
          headers: { Authorization: `Bearer ${token}` }
        });

        setResumeId(res.data.resume._id);
        setMessage("Resume saved successfully");
      }

    } catch (error) {
      console.log(error);
      setMessage("Error saving resume");
    }

    setLoading(false);

    setTimeout(() => setMessage(""), 3000);
  };

  // ✅ PREVIEW
  const previewResume = () => {

    const data = {
      name,
      email,
      phone,

      // 🔥 ARRAY SAFE
      skills: skills
        ? skills.split(",").map((s) => s.trim())
        : [],

      education,
      experience,
      projects,
      image // 🔥 NEW
    };

    setPreviewData(data);
  };

  // ✅ DOWNLOAD
  const downloadResume = async () => {

    const token = localStorage.getItem("token");

    if (!resumeId) {
      setMessage("Please save resume first");
      return;
    }

    setMessage("Downloading resume...");

    try {

      const res = await API.get(`/generate/download/${resumeId}`, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: "blob"
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");

      link.href = url;
      link.setAttribute("download", "resume.pdf");

      document.body.appendChild(link);
      link.click();

      setMessage("Download complete");

    } catch (error) {
      console.log(error);
      setMessage("Download failed");
    }

    setTimeout(() => setMessage(""), 3000);
  };

  return (

    <div className="builder-container">

      {/* LEFT FORM */}
      <div className="form-section">

        <button onClick={() => navigate("/dashboard")}>
          ← Back to Dashboard
        </button>

        <h2>Resume Builder</h2>

        {message && <p className="message">{message}</p>}

        <p>Selected Template: {template}</p>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="tel"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          type="text"
          placeholder="Skills (React, Node, MongoDB)"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
        />

        <input
          type="text"
          placeholder="Education"
          value={education}
          onChange={(e) => setEducation(e.target.value)}
        />

        <input
          type="text"
          placeholder="Experience"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
        />

        <input
          type="text"
          placeholder="Projects"
          value={projects}
          onChange={(e) => setProjects(e.target.value)}
        />

        {/* 🔥 IMAGE UPLOAD */}
        <input
          type="file"
          onChange={(e) => {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
              setImage(reader.result);
            };
            if (file) reader.readAsDataURL(file);
          }}
        />

        <button onClick={previewResume}>
          Preview Resume
        </button>

        <button onClick={handleSaveResume}>
          {loading ? "Saving..." : "Save Resume"}
        </button>

        <button onClick={downloadResume} disabled={!resumeId}>
          Download Resume
        </button>

      </div>

      {/* RIGHT PREVIEW */}
      <div className="preview-section">
        <ResumePreview data={previewData} />
      </div>

    </div>
  );
}

export default ResumeBuilder;