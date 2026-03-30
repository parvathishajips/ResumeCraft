import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function ResumeForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const template = location.state?.template;

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    location: "",
    dob: "",
    gender: "",
    skills: "",
    techSkills: "",
    languages: "",
    programming: "",
    education: "",
    projects: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    navigate("/resume", { state: { ...formData, template } });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Enter Details</h2>

      <input name="name" placeholder="Name" onChange={handleChange} /><br/>
      <input name="phone" placeholder="Phone" onChange={handleChange} /><br/>
      <input name="email" placeholder="Email" onChange={handleChange} /><br/>
      <input name="location" placeholder="Location" onChange={handleChange} /><br/>
      <input name="dob" placeholder="DOB" onChange={handleChange} /><br/>
      <input name="gender" placeholder="Gender" onChange={handleChange} /><br/>
      <input name="skills" placeholder="Skills (comma)" onChange={handleChange} /><br/>
      <input name="techSkills" placeholder="Tech Skills" onChange={handleChange} /><br/>
      <input name="languages" placeholder="Languages" onChange={handleChange} /><br/>
      <input name="programming" placeholder="Programming" onChange={handleChange} /><br/>
      <input name="education" placeholder="Education" onChange={handleChange} /><br/>
      <input name="projects" placeholder="Projects" onChange={handleChange} /><br/>

      <button onClick={handleSubmit}>Generate Resume</button>
    </div>
  );
}

export default ResumeForm;