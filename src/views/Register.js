// Register.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        phone: '',
        dateOfBirth: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí puedes enviar los datos de formData al servidor para el registro
        console.log(formData);
    };

    return (
        <div>
            <h2>Registro</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre de Usuario:</label>
                    <input type="text" name="username" value={formData.username} onChange={handleChange} />
                </div>
                <div>
                    <label>Correo Electrónico:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} />
                </div>
                <div>
                    <label>Contraseña:</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} />
                </div>
                <div>
                    <label>Teléfono:</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
                </div>
                <div>
                    <label>Fecha de Nacimiento:</label>
                    <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />
                </div>
                <Link to="/">
                <button type="submit">Registrarse</button>
                </Link>
            </form>
        </div>
    );
};

export default Register;