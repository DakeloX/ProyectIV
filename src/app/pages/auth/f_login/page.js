"use client"
import React, { useState, useRef } from 'react';
import axios from 'axios';
import Modal from '../../../../components/Modal';
import styles from "../../../styles/login.module.css";
import Slider from "react-slick";
import Image from 'next/image';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function F_Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        typeAuthTable: 'fundacion'
    });

    const [isModalOpen, setIsModalOpen] = useState(false);

    const router = useRouter();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const res = await signIn("credentials", {
            email: formData.email,
            password: formData.password,
            userType: formData.typeAuthTable,
            redirect: false,
        });

        if (res.error) {
            toast.error('¡Credenciales incorrectas!, intente de nuevo.');
            //alert(res.error);
        } else {
            router.push('/pages/f_options')
            router.refresh()
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleResetSubmit = async (event) => {
        event.preventDefault();
        try {
            // Aquí puedes hacer la solicitud para enviar el correo de restablecimiento
            console.log('Enviar enlace de restablecimiento a:', formData.email);
            // Supongamos que esto envía el correo con el enlace de restablecimiento
            handleCloseModal(); // Cierra el modal después de enviar el formulario
        } catch (error) {
            console.error('Error al enviar el correo de restablecimiento:', error);
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


            <main className={styles.mainContent}>
                <div className={styles.columns}>
                    <div className={styles.imageColumn}>
                        <div className={styles.sliderContent} onClick={goToNextSlide}>
                            <Slider ref={sliderRef} {...settings}>
                                <div>
                                    <Image src="/img/donacion2.jpg" alt="" width={400} height={400} className={styles.sliderImg} priority={true} />
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
                                    <a onClick={handleOpenModal}></a>
                                    <p className={styles.signupText}>¿No tienes una cuenta?</p>
                                    <a href="/pages/auth/f_register" className={styles.signInButton}>Crear cuenta</a>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </main>

            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSubmit={handleResetSubmit}
                onChange={handleChange}
                email={formData.email}
            />
        </div>
    );
}
