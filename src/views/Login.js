import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Eliminamos la función handleSubmit ya que no autenticaremos aquí

    return (
        <div>
            <h2>Iniciar Sesión</h2>
            <div>
                <label>Correo Electrónico:</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} />
            </div>
            <div>
                <label>Contraseña:</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} />
            </div>
            {/* Usamos Link para redirigir a la página de inicio al hacer clic en el botón */}
            <Link to="/home">
                <button type="button">Iniciar Sesión</button>
            </Link>
            <p>¿Aún no tienes una cuenta? <Link to="/register">Regístrate aquí</Link></p>
        </div>
    );
};

export default Login;