"use client";

import { useState } from 'react';
import axios from 'axios';
import styles from "@/app/styles/registerC.module.css";
import Image from 'next/image';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';

export default function Register() {
    const [formData, setFormData] = useState({
        nombre: '',
        identificacion: '',
        correo: '',
        contraseña: '',
    });

    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('/api/c_registro', formData);
            console.log('Registro exitoso:', response.data);
            toast.success('¡Registro exitoso! Bienvenido.', { autoClose: false });
            setFormData({
                nombre: '',
                identificacion: '',
                correo: '',
                contraseña: '',
            });
        } catch (error) {
            console.error('Error al registrar:', error);
            setErrorMessage('Error al registrar. Por favor, intenta de nuevo más tarde.');
            toast.error('Error al registrar. Por favor, intenta de nuevo.', { autoClose: false });
        }
    };

    return (
        <div className={styles.container}>
            <main className={styles.mainContent}>
                <div className={styles.columns}>
                    <div className={styles.imageColumn}>
                        <Link href="#" className={styles.link}>
                        <div className={styles.card}>
                            <div className={styles.imageItem}>
                                <Image src="/img/register_c.png" alt="Administrar Conductores" width={250} height={250} className={styles.image} />
                                <p className={styles.imageText}>Administrar Conductores</p>
                            </div>
                        </div>
                        </Link>
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