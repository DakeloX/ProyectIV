"use client"

import { useState, useEffect } from 'react';
import styles from "./../styles/login.module.css";
import { unstable_noStore as noStore } from 'next/cache';

export default function getDonaciones() {
    noStore();
    const [donaciones, setDonaciones] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchDonaciones() {
            try {
                const response = await fetch('/api/getDonaciones');
                const data = await response.json();
                setDonaciones(data);
                setLoading(false);
            } catch (error) {
                console.error('Error al obtener las donaciones:', error);
                setLoading(false);
            }
        }
        fetchDonaciones();
    }, []);

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
                <div className={styles.cardContainer}>
                    {loading ? (
                        <p>Cargando donaciones...</p>
                    ) : (
                        donaciones.map(donacion => (
                            <div key={donacion.id_donacion} className={styles.card}>
                                <h3>{donacion.nombre_producto}</h3>
                                <p><strong>Cantidad:</strong> {donacion.cantidad}</p>
                                <p><strong>Descripción:</strong> {donacion.descripcion}</p>
                                <p><strong>Fecha de caducidad:</strong> {donacion.fecha_caducidad}</p>
                                {/* Agrega más detalles si es necesario */}
                            </div>
                        ))
                    )}
                </div>
            </main>
        </div>
    );
}
