import styles from "./../styles/register.module.css";
import Image from 'next/image';
import Link from 'next/link';

export default function Register() {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.logo}>
                    <img src="/img/logo_donap.jpg" alt="Logo" className={styles.logoImage} />
                    <h1 className={styles.logoText}>DonApp</h1>
                </div>
                <nav className={styles.navLinks}>
                    <a href="/" className={styles.navLink}>Inicio</a>
                    <a href="#" className={styles.navLink}>Donaciones</a>
                    <a href="#" className={styles.navLink}>Fundaciones</a>
                </nav>
                <div className={styles.authLinks}>
                    <a href="/login" className={styles.loginLink}>Iniciar sesión</a>
                    <a href="/register" className={styles.registerLink}>Registro</a>
                </div>
            </header>

            <main className={styles.mainContent}>
                <div className={styles.imageContainer}>
                    <Link href="/f_register">
                        <div className={styles.imageItem}>
                            <Image src="/img/register.png" alt="Registrar" width={400} height={400} className={styles.image} />
                            <p className={styles.imageText}>Registrar Fundación</p>
                        </div>
                    </Link>
                    <Link href="/f_login">
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
