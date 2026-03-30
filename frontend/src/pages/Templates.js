import React from "react";
import { useNavigate } from "react-router-dom";

function Templates() {

  const navigate = useNavigate();

  const chooseTemplate = (template) => {
  navigate("/resume-form", { state: { template } });
};

  return (

    <div>

      <h2>Select Resume Template</h2>

      <button onClick={() => chooseTemplate("template2")}>
        Professional Resume
      </button>

      <button onClick={() => chooseTemplate("template3")}>
        Simple Resume
      </button>

    </div>

  );

}

export default Templates;