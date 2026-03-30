import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar(){

const navigate = useNavigate();

const logout = ()=>{

localStorage.removeItem("token");
localStorage.removeItem("email");

navigate("/login");

}

return(

<div className="navbar">

<div className="logo">
ResumeCraft
</div>

<div>

<button onClick={()=>navigate("/dashboard")}>
Dashboard
</button>

<button onClick={logout}>
Logout
</button>

</div>

</div>

)

}

export default Navbar;