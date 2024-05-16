"use client";

import { useState, useEffect } from 'react';
import DonationCard from "../../../components/DonationCard_F";
import styles from "../../../app/styles/login.module.css";
import { useSession } from 'next-auth/react';
import axios from 'axios';

export default function getDonaciones() {
    const { data: session } = useSession();
    const idFundacion = session?.user?.idUser; // Asegúrate de obtener el ID de la fundación correctamente

    const [donaciones, setDonaciones] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchDonaciones() {
            try {
                const response = await axios.post('/api/getDonacionesF', { idFundacion });
                const data = response.data;
                setDonaciones(data);
                setLoading(false);
            } catch (error) {
                console.error('Error al obtener las donaciones:', error);
                setLoading(false);
            }
        }

        if (idFundacion) {
            fetchDonaciones();
        }
    }, [idFundacion]);

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
