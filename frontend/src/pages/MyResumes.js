import React, { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom"

function MyResumes(){
  
  const navigate = useNavigate()

  const [resumes,setResumes] = useState([])
const [selectedResume,setSelectedResume] = useState(null)

  useEffect(()=>{

  const fetchResumes = async () => {

    try{

      const token = localStorage.getItem("token")

      const res = await API.get("/resumes",{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })

      setResumes(res.data)

    }catch(error){

      console.log(error)

    }

  }

  fetchResumes()

},[]);

const previewResume = (resume) => {

  setSelectedResume(resume)

}

const downloadResume = (id) => {

  window.open(`http://localhost:5000/api/generate/download/${id}`)

}

const editResume = (resume) => {

  navigate("/resume", { state: resume })

}

  return(

<div>

<h2>My Resumes</h2>

{resumes.length === 0 ? (

<p>No resumes found</p>

):
(resumes.map((resume)=>(

<div key={resume._id}>

<p>{resume.name}</p>

<button onClick={()=>previewResume(resume)}>
Preview
</button>

<button onClick={()=>editResume(resume)}>
Edit
</button>

<button onClick={()=>downloadResume(resume._id)}>
Download
</button>

</div>

))

)}

{selectedResume && (

<div>

<h3>Preview</h3>

<p>Name: {selectedResume.name}</p>
<p>Email: {selectedResume.email}</p>
<p>Phone: {selectedResume.phone}</p>
<p>Education: {selectedResume.education}</p>
<p>Experience: {selectedResume.experience}</p>

<button onClick={()=>setSelectedResume(null)}>
OK
</button>

</div>

)}

</div>

)

}

export default MyResumes;