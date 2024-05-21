import styles from "../../styles/fOptions.module.css";
import Image from 'next/image';
import Link from 'next/link';

export default function FOptions() {
    return (
        <div className={styles.container}>
            <main className={styles.mainContent}>
                <div className={styles.imageContainer}>
                    <Link href="/pages/auth/c_register" className={styles.link}>
                        <div className={styles.card}>
                            <div className={styles.imageItem}>
                                <Image src="/img/register_c.png" alt="Conductores" width={250} height={250} className={styles.image} />
                                <p className={styles.imageText}>Conductores</p>
                            </div>
                        </div>
                    </Link>
                    <Link href="/pages/donaciones/h_donaciones_F" className={styles.link}>
                        <div className={styles.card}>
                            <div className={styles.imageItem}>
                                <Image src="/img/rutas.png" alt="Administrar Donaciones" width={250} height={250} className={styles.image} />
                                <p className={styles.imageText}>Administrar Donaciones</p>
                            </div>
                        </div>
                    </Link>
                    <Link href="/pages/f_options/v_registro" className={styles.link}>
                        <div className={styles.card}>
                            <div className={styles.imageItem}>
                                <Image src="/img/vehiculos.png" alt="Vehículos" width={250} height={250} className={styles.image} />
                                <p className={styles.imageText}>Vehículos</p>
                            </div>
                        </div>
                    </Link>
                </div>
            </main>
        </div>
    );
}
