import styles from "@/app/styles/fOptions.module.css";
import Image from 'next/image';
import Link from 'next/link';

export default function Coptions() {
    return (
        <div className={styles.container}>
            <main className={styles.mainContent}>
                <div className={styles.imageContainer}>
                    <Link href="/pages/conductores/c_rutas" className={styles.link}>
                        <div className={styles.card}>
                            <div className={styles.imageItem}>
                                <Image src="/img/rutas.png" alt="Rutas" width={250} height={250} className={styles.image} />
                                <p className={styles.imageText}>Consultar Rutas</p>
                            </div>
                        </div>
                    </Link>
                    <Link href="/pages/conductores/admin_r" className={styles.link}>
                        <div className={styles.card}>
                            <div className={styles.imageItem}>
                                <Image src="/img/vehiculos.png" alt="Cargamento" width={250} height={250} className={styles.image} />
                                <p className={styles.imageText}>Cargamentos</p>
                            </div>
                        </div>
                    </Link>
                </div>
            </main>
        </div>
    );
}
