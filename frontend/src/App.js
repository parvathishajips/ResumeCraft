import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ResumeBuilder from "./pages/ResumeBuilder";
import Templates from "./pages/Templates";
import MyResumes from "./pages/MyResumes";
import SOP from "./pages/SOP";
import LOP from "./pages/LOP";
import CoverLetter from "./pages/CoverLetter";
import ResumeForm from "./pages/ResumeForm";
import ResumeTemplate from "./pages/ResumeTemplate";

function App() {

  return (

    <Router>

      <Routes>

        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/templates" element={<Templates />} />
        <Route path="/resume" element={<ResumeBuilder />} />
        <Route path="/myresumes" element={<MyResumes/>} />
        <Route path="/sop" element={<SOP/>}/>
        <Route path="/lop" element={<LOP/>}/>
        <Route path="/coverletter" element={<CoverLetter/>}/>
        <Route path="/resume-form" element={<ResumeForm />} />
        <Route path="/resume" element={<ResumeTemplate />} />

      </Routes>

    </Router>

  );

}

export default App;