"use client"
import React, { useState, useRef } from 'react';
import axios from 'axios';
import Modal from './../components/Modal';
import styles from "./../styles/login.module.css";
import Slider from "react-slick";
import Image from 'next/image';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation';

export default function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [formModal, setFormModal] = useState({
        resetEmail: '',
        newPassword: '',
        confirmPassword: '',
    });

    const router = useRouter()

    const handleSubmit = async (event) => {
        event.preventDefault();

            const res = await signIn("credentials", {
                email: formData.email,
                password: formData.password,
                redirect: false,
            });

            if (res.error){
                toast.error('¡Credenciales incorrectas!, intente de nuevo.');
                //alert(res.error);
            }else {
                router.push('/')
            }
    };


    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleChangeModal = (event) => {
        const { name, value } = event.target;
        setFormModal({ ...formModal, [name]: value });
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    // const handleResetSubmit = async (event) => {
    //     event.preventDefault();
    //     const token = localStorage.getItem('token'); // Obtener el token del localStorage

    //     try {
    //         // Verificar si se encontró un token en el localStorage
    //         if (!token) {
    //             console.error('No se encontró un token en el localStorage');
    //             return;
    //         }

    //         // Imprimir el token en la consola
    //         console.log('Token almacenado en el localStorage:', token);

    //         // Configurar los headers de la solicitud
    //         const config = {
    //             headers: {
    //                 Authorization: `Bearer ${token}` // Agregar el token al encabezado de autorización
    //             }
    //         };

    //         // Realizar la solicitud POST a la API de cambio de contraseña con el token en el encabezado
    //         const response = await axios.post('/api/newPassword', formModal, config);
    //         console.log('Cambio de contraseña exitoso:', response.data);
    //     } catch (error) {
    //         console.error('Error al cambiar la contraseña:', error);
    //         toast.error('Error al cambiar la contraseña');
    //     }
    // };


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
                                <h1 className={styles.registrationTitle}>Iniciar Sesión</h1>
                                <form onSubmit={handleSubmit}>
                                    <ToastContainer />
                                    <label htmlFor="email" className={styles.emailLabel}>Correo Electrónico</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={styles.inputField}
                                        aria-label="Correo Electrónico"
                                        required
                                    />
                                    <label htmlFor="password" className={styles.passwordLabel}>Contraseña</label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className={styles.inputField}
                                        aria-label="Contraseña"
                                        required
                                    />
                                    <button type="submit" className={styles.signInButton}>Iniciar sesión</button>
                                </form>
                                <div className={styles.signupSection}>
                                    <a onClick={handleOpenModal}>¿Olvidaste tu contraseña?</a>
                                    <p className={styles.signupText}>¿No tienes una cuenta?</p>
                                    <a href="/register" className={styles.signInButton}>Crear cuenta</a>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </main>

            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                //onSubmit={handleResetSubmit}
                onChange={handleChangeModal}
                email={formModal.resetEmail}
                newPassword={formModal.newPassword}
                confirmPassword={formModal.confirmPassword}
            />
        </div>
    );
}

