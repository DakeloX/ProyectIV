import styles from "../../styles/register.module.css";

import Image from 'next/image';
import Link from 'next/link';

export default function Register() {
    return (
        <div className={styles.container}>


            <main className={styles.mainContent}>
                <div className={styles.imageContainer}>
                    <Link href="/pages/auth/f_register">
                        <div className={styles.imageItem}>
                            <Image src="/img/register.png" alt="Registrar" width={400} height={400} className={styles.image} />
                            <p className={styles.imageText}>Registrar Fundación</p>
                        </div>
                    </Link>
                    <Link href="/pages/f_listado">
                        <div className={styles.imageItem}>
                            <Image src="/img/f_listado.png" alt="Listado Fundacion" width={400} height={400} className={styles.image} />
                            <p className={styles.imageText}>Ver Fundaciones</p>
                        </div>
                    </Link>
                    <Link href="/pages/auth/f_login">
                        <div className={styles.imageItem}>
                            <Image src="/img/login.png" alt="Iniciar Sesión" width={400} height={400} className={styles.image} />
                            <p className={styles.imageText}>Iniciar Sesión</p>
                        </div>
                    </Link>
                </div>
            </main>
        </div>
    );
}
