"use client"
import { useState } from 'react';
import axios from 'axios';
import styles from "./../styles/login.module.css";

export default function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [loginMessage, setLoginMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('/api/login', formData);
            console.log('Inicio de sesión exitoso:', response.data);
            setLoginMessage('Inicio de sesión exitoso');
            // Aquí podrías redirigir al usuario a otra página o mostrar un mensaje de éxito.
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            setLoginMessage('Error al iniciar sesión');
            // Aquí podrías mostrar un mensaje de error al usuario.
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div className={styles.container}>
            <section className={styles.heroSection}>
                <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/7f2ed6cae3de7997d2382d9fcc66672722811dc0fa28d506483d5a0d2be27944?apiKey=e160dde0fc0f401c873489b4f6f8cae7&" alt="Hero Image" className={styles.heroImage} />
                <div className={styles.mainContent}>
                    <div className={styles.contentWrapper}>
                        <div className={styles.leftColumn}>
                            <div className={styles.imageSection}>
                                <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/9ee03f308c19ce8073e066895c26905148d837abd955fd9dead4980bef295f2c?apiKey=e160dde0fc0f401c873489b4f6f8cae7&" alt="Image 2" className={styles.image2} />
                            </div>
                        </div>
                        <div className={styles.rightColumn}>
                            <div className={styles.loginSection}>
                                <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/75ba0a40ae23ef12a9557906bc46961c9137148a93e120e3fcb8291856d4f78f?apiKey=e160dde0fc0f401c873489b4f6f8cae7&" alt="Close Icon" className={styles.closeIcon} />
                                <nav className={styles.navigation}>
                                    <div className={styles.navLinks}>
                                        <a href="#" className={styles.loginLink}>Iniciar sesión</a>
                                        <a href="/register" className={styles.registerLink}>Registro</a>
                                        <a href="#" className={styles.contactLink}>Contáctenos</a>
                                    </div>
                                </nav>
                                <h2 className={styles.loginHeading}>Iniciar sesión</h2>
                                <form onSubmit={handleSubmit}>
                                    <label htmlFor="email" className={styles.emailLabel}>Correo Electrónico</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={styles.emailInput}
                                        required
                                    />
                                    <div className={styles.passwordWrapper}>
                                        <label htmlFor="password" className={styles.passwordLabel}>Contraseña</label>
                                        <input
                                            type="password"
                                            id="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            className={styles.passwordInput}
                                            required
                                        />
                                    </div>
                                    <a href="#" className={styles.forgotPassword}>Olvidé mi contraseña</a>
                                    <button type="submit" className={styles.loginButton}>Iniciar sesión</button>
                                    {loginMessage && <p>{loginMessage}</p>}
                                </form>
                                <div className={styles.signupSection}>
                                    <p className={styles.signupText}>¿No tienes una cuenta?</p>
                                    <a href="/register" className={styles.signInButton}>Crear cuenta</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}