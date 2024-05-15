"use client"
import { useState, useRef } from 'react';
import axios from 'axios';
import styles from "../../styles/register.module.css";
import Slider from "react-slick";
import Image from 'next/image';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Register() {
    const [formData, setFormData] = useState({
        nombre: '',
        identificacion: '',
        correo: '',
        contraseña: '',
        vehiculo: '',
    });
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('/api/c_registro', formData);
            console.log('Registro exitoso:', response.data);
            toast.success('¡Registro exitoso! Bienvenido.',
            {autoClose: false});
            setFormData({
                nombre: '',
                identificacion: '',
                correo: '',
                contraseña: '',
                vehiculo: '',
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
                                <h1 className={styles.registrationTitle}>Registro de Conductor</h1>
                                <form onSubmit={handleSubmit}>
                                    <ToastContainer />
                                    <label htmlFor="nombre" className={styles.organizationLabel}>
                                        Nombre
                                    </label>
                                    <input
                                        type="text"
                                        id="nombre"
                                        name="nombre"
                                        value={formData.nombre}
                                        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                                        className={styles.inputField}
                                        aria-label="Nombre."
                                        required
                                    />

                                    <label htmlFor="identificacion" className={styles.organizationLabel}>
                                        Identificación
                                    </label>
                                    <input
                                        type="text"
                                        id="identificacion"
                                        name="identificacion"
                                        value={formData.identificacion}
                                        onChange={(e) => setFormData({ ...formData, identificacion: e.target.value })}
                                        className={styles.inputField}
                                        aria-label="Identificación."
                                        required
                                    />
                                    
                                    <label htmlFor="correo" className={styles.emailLabel}>
                                        Correo Electrónico
                                    </label>
                                    <input
                                        type="email"
                                        id="correo"
                                        name="correo"
                                        value={formData.correo}
                                        onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
                                        className={styles.inputField}
                                        aria-label="Correo Electrónico"
                                        required
                                    />
                                    <label htmlFor="contraseña" className={styles.passwordLabel}>
                                        Contraseña
                                    </label>
                                    <input
                                        type="password"
                                        id="contraseña"
                                        name="contraseña"
                                        value={formData.contraseña}
                                        onChange={(e) => setFormData({ ...formData, contraseña: e.target.value })}
                                        className={styles.inputField}
                                        aria-label="Contraseña"
                                        required
                                    />
                                    <label htmlFor="vehiculo" className={styles.organizationLabel}>
                                        Vehículo (Placa)
                                    </label>
                                    <input
                                        type="text"
                                        id="vehiculo"
                                        name="vehiculo"
                                        value={formData.vehiculo}
                                        onChange={(e) => setFormData({ ...formData, vehiculo: e.target.value })}
                                        className={styles.inputField}
                                        aria-label="Vehículo (Placa)."
                                        required
                                    />
                                    <button type="submit" className={styles.signInButton}>
                                        Registrarme
                                    </button>
                                </form>
                            </section>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
