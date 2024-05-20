import styles from "../../styles/fundacion.module.css";

import Image from 'next/image';
import Link from 'next/link';

export default function Fundacion() {
    return (
        <div className={styles.container}>
            <main className={styles.mainContent}>
                <div className={styles.imageContainer}>
                    <Link href="/pages/auth/f_register" className={styles.link}>
                        <div className={styles.card}>
                            <div className={styles.imageItem}>
                                <Image src="/img/register.png" alt="Registrar" width={200} height={200} className={styles.image} />
                                <p className={styles.imageText}>Registrar Fundación</p>
                            </div>
                        </div>
                    </Link>
                    <Link href="/pages/f_listado" className={styles.link}>
                        <div className={styles.card}>
                            <div className={styles.imageItem}>
                                <Image src="/img/f_listado.png" alt="Listado Fundacion" width={200} height={200} className={styles.image} />
                                <p className={styles.imageText}>Ver Fundaciones</p>
                            </div>
                        </div>
                    </Link>
                    <Link href="/pages/auth/f_login" className={styles.link}>
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
