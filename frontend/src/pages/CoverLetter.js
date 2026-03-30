import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import jsPDF from "jspdf"

function CoverLetter(){

const navigate = useNavigate();

const [name,setName] = useState("");
const [position,setPosition] = useState("");
const [company,setCompany] = useState("");
const [letter,setLetter] = useState("");
 
const generateLetter = ()=>{

const text = `
Cover Letter

Dear Hiring Manager,

My name is ${name}. I am writing to apply for the position of ${position} at ${company}.

I have strong skills and enthusiasm for this role and believe I can contribute effectively to your team.

Thank you for considering my application.

Sincerely,
${name}
`;

setLetter(text);

}

const downloadLetter = () => {

  const doc = new jsPDF("p","mm","a4") // A4 format

  const marginLeft = 20
  const marginTop = 20
  const lineHeight = 7

  const lines = doc.splitTextToSize(letter, 170)

  let y = marginTop

  lines.forEach((line)=>{
    doc.text(line, marginLeft, y)
    y += lineHeight
  })

  doc.save("cover-letter.pdf")
}

return(

<div className="page-center">

<div className="card-box">

<button onClick={()=>navigate("/dashboard")}>
← Back
</button>

<h2>Cover Letter Generator</h2>

<input
placeholder="Your Name"
onChange={(e)=>setName(e.target.value)}
/>

<input
placeholder="Job Position"
onChange={(e)=>setPosition(e.target.value)}
/>

<input
placeholder="Company Name"
onChange={(e)=>setCompany(e.target.value)}
/>

<button onClick={generateLetter}>
Generate Letter
</button>

{letter && (

<>

<textarea
value={letter}
rows="8"
style={{width:"100%",marginTop:"10px"}}
/>

<button onClick={downloadLetter}>
Download Letter
</button>



</>

)}

</div>

</div>

)

}

export default CoverLetter;