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

export default function RegisterVehiculo() {
    const [formData, setFormData] = useState({
        numero_placa: '',
        tipo_vehiculo: '',
        propietario: ''
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('/api/v_registro', formData);
            console.log('Registro exitoso:', response.data);
            toast.success('¡Registro de vehículo exitoso! Bienvenido.', { autoClose: false });
            setFormData({
                numero_placa: '',
                tipo_vehiculo: '',
                propietario: ''
            });
        } catch (error) {
            console.error('Error al registrar vehículo:', error);
            toast.error('Error al registrar vehículo. Por favor, intenta de nuevo.', { autoClose: false });
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
                                <h1 className={styles.registrationTitle}>Registro de Vehículo</h1>
                                <form onSubmit={handleSubmit}>
                                    <ToastContainer />
                                    <label htmlFor="numero_placa" className={styles.organizationLabel}>
                                        Número de Placa
                                    </label>
                                    <input
                                        type="text"
                                        id="numero_placa"
                                        name="numero_placa"
                                        value={formData.numero_placa}
                                        onChange={(e) => setFormData({ ...formData, numero_placa: e.target.value })}
                                        className={styles.inputField}
                                        aria-label="Número de Placa."
                                        required
                                    />
                                    <label htmlFor="tipo_vehiculo" className={styles.organizationLabel}>
                                        Tipo de Vehículo
                                    </label>
                                    <input
                                        type="text"
                                        id="tipo_vehiculo"
                                        name="tipo_vehiculo"
                                        value={formData.tipo_vehiculo}
                                        onChange={(e) => setFormData({ ...formData, tipo_vehiculo: e.target.value })}
                                        className={styles.inputField}
                                        aria-label="Tipo de Vehículo."
                                        required
                                    />
                                    <label htmlFor="propietario" className={styles.organizationLabel}>
                                        Propietario
                                    </label>
                                    <input
                                        type="text"
                                        id="propietario"
                                        name="propietario"
                                        value={formData.propietario}
                                        onChange={(e) => setFormData({ ...formData, propietario: e.target.value })}
                                        className={styles.inputField}
                                        aria-label="Propietario."
                                        required
                                    />
                                    <button type="submit" className={styles.signInButton}>
                                        Registrar Vehículo
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