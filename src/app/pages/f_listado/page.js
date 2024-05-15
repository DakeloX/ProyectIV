"use client"
import { useState, useEffect } from 'react';
import styles from "../../styles/login.module.css";

import { unstable_noStore as noStore } from 'next/cache';

export default function getFundaciones() {
    const [fundaciones, setFundaciones] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchFundaciones() {
            noStore();
            try {
                const response = await fetch('/api/getFundaciones');
                const data = await response.json();
                setFundaciones(data);
                setLoading(false);
            } catch (error) {
                console.error('Error al obtener las fundaciones:', error);
                setLoading(false);
            }
        }
        fetchFundaciones();
    }, []);

    return (
        <div className={styles.container}>

            <main className={styles.mainContent}>
                <div className={styles.cardContainer}>
                    {loading ? (
                        <p>Cargando fundaciones...</p>
                    ) : (
                        fundaciones.map(fundacion => (
                            <div key={fundacion.id_fundacion} className={styles.card}>
                                <h3>{fundacion.nombre}</h3>
                                <p><strong>Teléfono:</strong> {fundacion.telefono}</p>
                                <p><strong>Departamento:</strong> {fundacion.departamento}</p>
                                <p><strong>Ciudad:</strong> {fundacion.ciudad}</p>
                                <p><strong>Dirección:</strong> {fundacion.direccion}</p>
                                <p><strong>Sitio web:</strong> {fundacion.website}</p>
                                {/* Agrega más detalles si es necesario */}
                            </div>
                        ))
                    )}
                </div>
            </main>
        </div>
    );
}