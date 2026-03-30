import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function SOP(){

const navigate = useNavigate();

const [name,setName] = useState("");
const [course,setCourse] = useState("");
const [university,setUniversity] = useState("");
const [sop,setSop] = useState("");

const generateSOP = ()=>{

const text = `
Statement of Purpose

My name is ${name}. I am applying for the ${course} program at ${university}. 
I am passionate about learning new technologies and developing my professional skills.

I believe that studying at ${university} will provide me with excellent academic knowledge, 
global exposure, and opportunities to enhance my career.

Thank you for considering my application.
`;

setSop(text);

}

const downloadSOP = ()=>{

const element = document.createElement("a");

const file = new Blob([sop],{type:"text/plain"});

element.href = URL.createObjectURL(file);

element.download = "SOP.txt";

document.body.appendChild(element);

element.click();

}

return(

<div className="page-center">

<div className="card-box">

<button onClick={()=>navigate("/dashboard")}>
← Back
</button>

<h2>SOP Generator</h2>

<input
placeholder="Your Name"
onChange={(e)=>setName(e.target.value)}
/>

<input
placeholder="Course"
onChange={(e)=>setCourse(e.target.value)}
/>

<input
placeholder="University"
onChange={(e)=>setUniversity(e.target.value)}
/>

<button onClick={generateSOP}>
Generate SOP
</button>

{sop && (

<>

<button onClick={downloadSOP}>
Download SOP
</button>

<textarea
value={sop}
rows="8"
style={{width:"100%",marginTop:"10px"}}
/>

</>

)}

</div>

</div>

)

}

export default SOP;