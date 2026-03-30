import React from "react";
import {useNavigate} from "react-router-dom";
import Navbar from "../components/Navbar";
import "../App.css";

function Dashboard(){

const navigate = useNavigate();

const email = localStorage.getItem("email");

return(

<div>

<Navbar/>

<div className="dashboard-container">

<h1>ResumeCraft Dashboard</h1>

<p>{email}</p>

<div className="dashboard-grid">

<div className="card" onClick={()=>navigate("/templates")}>
<h3>Resume Templates</h3>
<p>Create resume</p>
</div>

<div className="card" onClick={()=>navigate("/resume")}>
<h3>Resume Builder</h3>
<p>Build resume</p>
</div>

<div className="card" onClick={()=>navigate("/myresumes")}>
<h3>My Resumes</h3>
<p>Saved resumes</p>
</div>

<div className="card" onClick={()=>navigate("/sop")}>
<h3>SOP Generator</h3>
</div>

<div className="card" onClick={()=>navigate("/lop")}>
<h3>LOP Generator</h3>
</div>

<div className="card" onClick={()=>navigate("/coverletter")}>
<h3>Cover Letter</h3>
</div>

</div>

</div>

</div>

)

}

export default Dashboard;