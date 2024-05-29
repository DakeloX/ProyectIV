"use client";
import styles from "../../../styles/fundacion.module.css";
import Image from 'next/image';
import Link from 'next/link';

export default function Conductores() {
    return (
        <div className={styles.container}>
            <main className={styles.mainContent}>
                <div className={styles.imageContainer}>
                        <Link href="/pages/auth/c_login" className={styles.link}>
                            <div className={styles.card}>
                                <div className={styles.imageItem}>
                                    <Image src="/img/login.png" alt="Iniciar Sesión" width={200} height={200} className={styles.image} />
                                    <p className={styles.imageText}>Iniciar Sesión</p>
                                </div>
                            </div>
                        </Link>
                </div>
            </main>
        </div>
    );
}
