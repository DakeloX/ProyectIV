"use client"
import { useState, useRef } from 'react';
import axios from 'axios';
import styles from "./../styles/register.module.css";
import Slider from "react-slick";
import Image from 'next/image';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Register() {
    const [formData, setFormData] = useState({
        username: '',
        id_user: '',
        telefono: '',
        departamento: '',
        ciudad: '',
        email: '',
        password: '',
    });
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('/api/registro', formData);
            console.log('Registro exitoso:', response.data);
            toast.success('¡Registro exitoso! Bienvenido.',
            {autoClose: false});
            setFormData({
                username: '',
                id_user: '',
                telefono: '',
                departamento: '',
                ciudad: '',
                email: '',
                password: '',
            });
            // Aquí podrías redirigir al usuario a otra página o mostrar un mensaje de éxito.
        } catch (error) {
            console.error('Error al registrar:', error);
            setErrorMessage('Error al registrar. Por favor, intenta de nuevo más tarde.');
            toast.error('Error al registrar. Por favor, intenta de nuevo.',
            {autoClose: false});
            
        }
    };

    const sliderRef = useRef(null);
    const [currentSlide, setCurrentSlide] = useState(0);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        beforeChange: (next) => setCurrentSlide(next)
    };

    const goToNextSlide = () => {
        if (sliderRef.current) {
            sliderRef.current.slickNext();
        }
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.logo}>
                    <img src="/img/logo_donap.jpg" alt="Logo" className={styles.logoImage} />
                    <h1 className={styles.logoText}>DonApp</h1>
                </div>
                <nav className={styles.navLinks}>
                    <a href="/" className={styles.navLink}>Inicio</a>
                    <a href="#" className={styles.navLink}>Donaciones</a>
                    <a href="/fundaciones" className={styles.navLink}>Fundaciones</a>
                </nav>
                <div className={styles.authLinks}>
                    <a href="/login" className={styles.loginLink}>Iniciar sesión</a>
                    <a href="/register" className={styles.registerLink}>Registro</a>
                </div>
            </header>

            <main className={styles.mainContent}>
                <div className={styles.columns}>
                    <div className={styles.imageColumn}>
                        <div className={styles.sliderContent} onClick={goToNextSlide}>
                            <Slider ref={sliderRef} {...settings}>
                                <div>
                                    <Image src="/img/donacion2.jpg" alt="" width={400} height={400} className={styles.sliderImg} />
                                </div>
                                <div>
                                    <Image src="/img/donacion3.jpg" alt="" width={400} height={400} className={styles.sliderImg} />
                                </div>
                                <div>
                                    <Image src="/img/donacion1.jpg" alt="" width={400} height={400} className={styles.sliderImg} />
                                </div>
                            </Slider>
                        </div>
                    </div>
                    <div className={styles.contentColumn}>
                        <div className={styles.contentWrapper}>
                            <section className={styles.registrationContainer}>
                                <h1 className={styles.registrationTitle}>Registro</h1>
                                <form onSubmit={handleSubmit}>
                                    <ToastContainer />
                                    <label htmlFor="organization" className={styles.organizationLabel}>
                                        Nombre de Usuario
                                    </label>
                                    <input
                                        type="text"
                                        id="username"
                                        name="username"
                                        value={formData.username}
                                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                        className={styles.inputField}
                                        aria-label="Nombre de usuario o organización."
                                        required
                                    />

                                    <label htmlFor="id_user" className={styles.organizationLabel}>
                                        Número de identificación
                                    </label>
                                    <input
                                        type="text"
                                        id="id_user"
                                        name="id_user"
                                        value={formData.id_user}
                                        onChange={(e) => setFormData({ ...formData, id_user: e.target.value })}
                                        className={styles.inputField}
                                        aria-label="Número de identificación."
                                        required
                                    />
                                    <label htmlFor="telefono" className={styles.organizationLabel}>
                                        Teléfono
                                    </label>
                                    <input
                                        type="text"
                                        id="telefono"
                                        name="telefono"
                                        value={formData.telefono}
                                        onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                                        className={styles.inputField}
                                        aria-label="Teléfono"
                                        pattern="[0-9]*"
                                        required
                                    />
                                    <label htmlFor="email" className={styles.emailLabel}>
                                        Correo Electrónico
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className={styles.inputField}
                                        aria-label="Correo Electrónico"
                                        required
                                    />
                                    <label htmlFor="password" className={styles.passwordLabel}>
                                        Contraseña
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        className={styles.inputField}
                                        aria-label="Contraseña"
                                        required
                                    />
                                    <label htmlFor="Departamento" className={styles.organizationLabel}>
                                        Departamento
                                    </label>
                                    <input
                                        type="text"
                                        id="department"
                                        name="department"
                                        value={formData.departamento}
                                        onChange={(e) => setFormData({ ...formData, departamento: e.target.value })}
                                        className={styles.inputField}
                                        aria-label="Departamento."
                                        required
                                    />
                                    <label htmlFor="ciudad" className={styles.organizationLabel}>
                                        Ciudad
                                    </label>
                                    <input
                                        type="text"
                                        id="ciudad"
                                        name="ciudad"
                                        value={formData.ciudad}
                                        onChange={(e) => setFormData({ ...formData, ciudad: e.target.value })}
                                        className={styles.inputField}
                                        aria-label="Ciudad."
                                        required
                                    />
                                    <button type="submit" className={styles.signInButton}>
                                        Registrarme
                                    </button>
                                </form>
                                <div className={styles.optionsContainer}>
                                    <a href="/fundaciones" className={styles.helpLink}>
                                        ¿Eres fundacion? Registrate aqui
                                    </a>
                                </div>
                            </section>
                            <section className={styles.loginSection}>
                                <p className={styles.loginText}>¿Ya tienes una cuenta?</p>
                                <a href="/login" className={styles.signInButton}>Iniciar sesión</a>
                            </section>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}