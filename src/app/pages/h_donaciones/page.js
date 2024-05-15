"use client"

import { useState, useEffect } from 'react';
import styles from "../../styles/login.module.css";

import { unstable_noStore as noStore } from 'next/cache';

export default function getDonaciones() {
    const [donaciones, setDonaciones] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchDonaciones() {
            noStore();
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
