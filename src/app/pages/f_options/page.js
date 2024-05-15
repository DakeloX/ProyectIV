import styles from "../../styles/register.module.css";

import Image from 'next/image';
import Link from 'next/link';

export default function Register() {
    return (
        <div className={styles.container}>


            <main className={styles.mainContent}>
                <div className={styles.imageContainer}>
                    <Link href="/views/c_register">
                        <div className={styles.imageItem}>
                            <Image src="/img/register_c.png" alt="Registro conductores" width={400} height={400} className={styles.image} />
                            <p className={styles.imageText}>Registrar Conductores</p>
                        </div>
                    </Link>
                    <Link href="/views/h_donaciones">
                        <div className={styles.imageItem}>
                            <Image src="/img/h_donaciones.png" alt="Historial donaciones" width={400} height={400} className={styles.image} />
                            <p className={styles.imageText}>Historial de Donaciones</p>
                        </div>
                    </Link>
                    <Link href="/views/f_donacion">
                        <div className={styles.imageItem}>
                            <Image src="/img/add_donacion.png" alt="Registrar donacion" width={400} height={400} className={styles.image} />
                            <p className={styles.imageText}>Registrar Donaciones</p>
                        </div>
                    </Link>
                </div>
            </main>
        </div>
    );
}
