"use client";

import { useState, useEffect } from 'react';
import styles from "../../styles/login.module.css";
import { unstable_noStore as noStore } from 'next/cache';
import DonationCard from '../../../components/DonationCard';

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
                            <DonationCard key={donacion.id_donacion} donacion={donacion} />
                        ))
                    )}
                </div>
            </main>
        </div>
    );
}