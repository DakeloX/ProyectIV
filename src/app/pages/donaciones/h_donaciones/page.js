"use client";

import { useState, useEffect } from 'react';
import DonationCard from "@/components/DonationCard";
import styles from "@/app/styles/login.module.css";
import { useSession } from 'next-auth/react';
import axios from 'axios';

export default function getDonaciones() {
    const { data: session } = useSession();
    const idUser = session?.user?.idUser;

    const [donaciones, setDonaciones] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchDonaciones() {
            try {
                const response = await axios.post('/api/getDonaciones/donacionesUser', { idUser });
                const data = response.data;
                setDonaciones(data);
                setLoading(false);
            } catch (error) {
                console.error('Error al obtener las donaciones:', error);
                setLoading(false);
            }
        }

        if (idUser) {
            fetchDonaciones();
        }
    }, [idUser]);

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