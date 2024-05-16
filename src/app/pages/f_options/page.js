import styles from "../../styles/register.module.css";

import Image from 'next/image';
import Link from 'next/link';

export default function Register() {
    return (
        <div className={styles.container}>


            <main className={styles.mainContent}>
                <div className={styles.imageContainer}>
                    <Link href="/pages/c_register">
                        <div className={styles.imageItem}>
                            <Image src="/img/register_c.png" alt="Administrar Conductores" width={400} height={400} className={styles.image} />
                            <p className={styles.imageText}>Administrar Conductores</p>
                        </div>
                    </Link>
                    <Link href="/pages/h_donaciones_F">
                        <div className={styles.imageItem}>
                            <Image src="/img/h_donaciones.png" alt="Administra Donaciones" width={400} height={400} className={styles.image} />
                            <p className={styles.imageText}>Administrar Donaciones</p>
                        </div>
                    </Link>
                    <Link href="/pages/v_registro">
                        <div className={styles.imageItem}>
                            <Image src="/img/rutas.png" alt="Administrar Vehiculos" width={400} height={400} className={styles.image} />
                            <p className={styles.imageText}>Administrar Vehiculos</p>
                        </div>
                    </Link>
                </div>
            </main>
        </div>
    );
}
