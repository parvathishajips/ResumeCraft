import React,{useState} from "react";
import API from "../services/api";
import {useNavigate,Link} from "react-router-dom";
import "../App.css";

function Login(){

const navigate = useNavigate();

const [email,setEmail] = useState("");
const [password,setPassword] = useState("");
const [message,setMessage] = useState("");

const handleLogin = async()=>{

try{

const res = await API.post("/users/login",{email,password});

localStorage.setItem("token",res.data.token);
localStorage.setItem("email",email);

navigate("/dashboard");

}catch(error){

setMessage("Invalid login");

}

}

return(

<div className="page-center">

<div className="card-box">

<h2>Login</h2>

{message && <p className="message">{message}</p>}

<input
placeholder="Email"
onChange={(e)=>setEmail(e.target.value)}
/>

<input
type="password"
placeholder="Password"
onChange={(e)=>setPassword(e.target.value)}
/>

<button onClick={handleLogin}>
Login
</button>

<p>
New user? <Link to="/">Register</Link>
</p>

</div>

</div>

)

}

export default Login;