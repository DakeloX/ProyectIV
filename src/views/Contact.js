import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div>
      <h1>Acerca de</h1>
      <p>Esta aplicación fue desarrollada con React y Node.js.</p>
      <p>Puedes encontrar más información en el siguiente enlace:</p>
      <a href="https://github.com/DakeloX/ProyectIV/tree/main">Repositorio GitHub</a>
      <Link to="/">Home</Link>
      <Link to="/contact">Contact</Link>
    </div>
  );
};

export default About;