import React, { useState } from "react"
import API from "../services/api"
import { useNavigate, Link } from "react-router-dom"
import "../App.css"

function Register(){

const navigate = useNavigate()

const [name,setName] = useState("")
const [email,setEmail] = useState("")
const [password,setPassword] = useState("")

const handleRegister = async () => {
  try {
    const res = await API.post("/register", {
      name,
      email,
      password
    });

    // Save user (optional)
    localStorage.setItem("user", JSON.stringify(res.data));

    // 🔥 Redirect to Dashboard
    navigate("/dashboard");

  } catch (err) {
    console.log(err);
    alert("Registration failed");
  }
};

return(

<div className="page-center">

<div className="card-box">

<div className="head"><h1>ResumeCraft</h1></div>

<h2>Register</h2>

<form autoComplete="off">

<input
type="text"
placeholder="Enter your name"
value={name}
autoComplete="off"
onChange={(e)=>setName(e.target.value)}
/>

<input
type="email"
placeholder="Enter your email"
value={email}
autoComplete="off"
onChange={(e)=>setEmail(e.target.value)}
/>

<input
type="password"
placeholder="Enter your password"
value={password}
autoComplete="new-password"
onChange={(e)=>setPassword(e.target.value)}
/>

<button type="button" onClick={handleRegister}>
Register
</button>

<p className="login-text">
  Already have an account? <Link to="/login">Login</Link>
</p>

</form>

</div>

</div>

)

}

export default Register