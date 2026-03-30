import React from "react";

function ResumePreview({ data }) {

  if (!data) return null;

  // ✅ SAFE SKILLS (array or string handle)
  const skillsArray = Array.isArray(data.skills)
    ? data.skills
    : data.skills
    ? data.skills.split(",").map((s) => s.trim())
    : [];

  return (

    <div className="resume">

      {/* HEADER */}
      <div className="header">
        <img
          src={data.image || "https://via.placeholder.com/100"}
          alt="profile"
        />
        <h1>{data.name}</h1>
      </div>

      <div className="main">

        {/* LEFT COLUMN */}
        <div className="left">

          <div className="section">
            <h3>CONTACT</h3>
            <p>{data.phone}</p>
            <p>{data.email}</p>
          </div>

          <div className="section">
            <h3>SKILLS</h3>
            <ul>
              {skillsArray.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>

        </div>

        {/* RIGHT COLUMN */}
        <div className="right">

          <div className="section">
            <h3>EDUCATION</h3>
            <p>{data.education}</p>
          </div>

          <div className="section">
            <h3>EXPERIENCE</h3>
            <p>{data.experience}</p>
          </div>

          <div className="section">
            <h3>PROJECTS</h3>
            <p>{data.projects}</p>
          </div>

        </div>

      </div>

    </div>

  );
}

export default ResumePreview;