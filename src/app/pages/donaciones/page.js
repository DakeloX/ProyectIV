"use client";
import styles from "../../styles/donaciones.module.css";
import { useSession } from "next-auth/react";
import Image from 'next/image';
import Link from 'next/link';

export default function Donaciones() {
    const { data: session } = useSession();
    const typeUser = session?.user?.userType; // Asegúrate de que estás accediendo a la propiedad correcta

    return (
        <div className={styles.container}>
            <main className={styles.mainContent}>
                <div className={styles.imageContainer}>
                    {session && typeUser === 'user' && (
                        <Link href="/pages/h_donaciones" className={styles.link}>
                            <div className={styles.card}>
                                <div className={styles.imageItem}>
                                    <Image src="/img/h_donaciones.png" alt="Historial donaciones" width={250} height={250} className={styles.image} />
                                    <p className={styles.imageText}>Historial de Donaciones</p>
                                </div>
                            </div>
                        </Link>
                    )}

                    {session && typeUser === 'fundacion' && (
                        <Link href="/pages/h_donaciones_F" className={styles.link}>
                            <div className={styles.card}>
                                <div className={styles.imageItem}>
                                    <Image src="/img/h_donaciones.png" alt="Historial donaciones" width={250} height={250} className={styles.image} />
                                    <p className={styles.imageText}>Historial de Donaciones</p>
                                </div>
                            </div>
                        </Link>
                    )}

                    {session && typeUser === 'fundacion' && (
                        <Link href="/pages/f_donacion" className={styles.link}>
                            <div className={styles.card}>
                                <div className={styles.imageItem}>
                                    <Image src="/img/add_donacion.png" alt="Registrar donacion" width={250} height={250} className={styles.image} />
                                    <p className={styles.imageText}>Registrar Donaciones</p>
                                </div>
                            </div>
                        </Link>
                    )}
                </div>
            </main>
        </div>
    );
}
