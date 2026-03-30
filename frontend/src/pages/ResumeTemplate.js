import React from "react";
import { useLocation } from "react-router-dom";
import jsPDF from "jspdf";

function ResumeTemplate() {
  const location = useLocation();
  const data = location.state || {};

  const downloadPDF = () => {
    const doc = new jsPDF("p", "pt", "a4");

    doc.html(document.querySelector(".resume"), {
      callback: function (pdf) {
        pdf.save("resume.pdf");
      },
      margin: [20, 20, 20, 20],
    });
  };

  return (
    <div>

      {/* DOWNLOAD BUTTON */}
      <div className="btn-row">
        <button onClick={downloadPDF}>Download PDF</button>
      </div>

      {/* RESUME */}
      <div className="resume">

        {/* HEADER */}
        <div className="header">
          <img src="https://via.placeholder.com/100" alt="profile" />
          <h1>{data.name}</h1>
        </div>

        <div className="main">

          {/* LEFT SIDE */}
          <div className="left">

            <div className="section">
              <h3>GET IN CONTACT</h3>
              <p>Mobile: {data.phone}</p>
              <p>Email: {data.email}</p>
            </div>

            <div className="section">
              <h3>PERSONAL DETAILS</h3>
              <p>Location: {data.location}</p>
              <p>DOB: {data.dob}</p>
              <p>Gender: {data.gender}</p>
            </div>

            <div className="section">
              <h3>SKILLS</h3>
              <ul>
                {data.skills
                  ? data.skills.split(",").map((skill, i) => (
                      <li key={i}>{skill.trim()}</li>
                    ))
                  : null}
              </ul>
            </div>

            <div className="section">
              <h3>TECHNICAL SKILLS</h3>
              <ul>
                {data.techSkills
                  ? data.techSkills.split(",").map((skill, i) => (
                      <li key={i}>{skill.trim()}</li>
                    ))
                  : null}
              </ul>
            </div>

            <div className="section">
              <h3>LANGUAGES</h3>
              <ul>
                {data.languages
                  ? data.languages.split(",").map((lang, i) => (
                      <li key={i}>{lang.trim()}</li>
                    ))
                  : null}
              </ul>
            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="right">

            <div className="section">
              <h3>EDUCATION</h3>
              <p>{data.education}</p>
            </div>

            <div className="section">
              <h3>PROJECTS</h3>
              <p>{data.projects}</p>
            </div>

            <div className="section">
              <h3>PROGRAMMING</h3>
              <p>{data.programming}</p>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}

export default ResumeTemplate;