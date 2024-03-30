"use client"
import { useRef, useState } from 'react';
import styles from "./../styles/login.module.css";
import Slider from "react-slick";
import Image from 'next/image';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Register() {

    const [currentSlide, setCurrentSlide] = useState(0);
    const sliderRef = useRef(null);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        beforeChange: (next) => setCurrentSlide(next)
    };

    const goToNextSlide = () => {
        if (sliderRef.current) {
            sliderRef.current.slickNext();
        }
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.headerContent}>
                    <nav className={styles.navLinks}>
                        <a href="#" className={styles.navLink}>¡Conócenos!</a>
                        <a href="#" className={styles.navLink}>Registro</a>
                        <a href="#" className={styles.navLink}>Boletín Informativo</a>
                    </nav>
                    <div className={styles.profileIcon} aria-label="Profile icon"></div>
                </div>
            </header>

            <main className={styles.mainContent}>
                <div className={styles.columns}>
                    <div className={styles.imageColumn}>
                        <div className={styles.sliderContent} onClick={goToNextSlide}>
                            <Slider ref={sliderRef} {...settings}>
                                <div>
                                    <Image src="/img/donacion2.jpg" alt="" width={400} height={400} className={styles.sliderImg} />
                                </div>
                                <div>
                                    <Image src="/img/donacion3.jpg" alt="" width={400} height={400} className={styles.sliderImg} />
                                </div>
                                <div>
                                    <Image src="/img/donacion1.jpg" alt="" width={400} height={400} className={styles.sliderImg} />
                                </div>
                            </Slider>
                        </div>
                    </div>
                    <div className={styles.contentColumn}>
                        <div className={styles.contentWrapper}>
                            <div className={styles.footer}>
                                <div className={styles.footerLinks}>
                                    <a href="#" className={styles.loginLink}>Iniciar sesión</a>
                                    <a href="/register" className={styles.footerLink}>Registro</a>
                                    <a href="#" className={styles.footerLink}>Contáctenos</a>
                                </div>
                            </div>
                            <section className={styles.loginContainer}>
                                <h1 className={styles.loginTitle}>Inicio de sesión</h1>
                                <form>
                                    <label htmlFor="email" className={styles.emailLabel}>
                                        Correo Electrónico
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className={styles.inputField}
                                        aria-label="Correo Electrónico"
                                        required
                                    />
                                    <div className={styles.passwordContainer}>
                                        <label htmlFor="password" className={styles.passwordLabel}>
                                            Contraseña
                                        </label>
                                        <div className={styles.passwordToggle}>
                                            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/f59493de73ab9f0f002cc630b00987a319016a04052d04e4ab29736c5333bab8?apiKey=7863fbeada814cc6944fd546413d7a2e&" alt="" className={styles.passwordToggleIcon} />
                                            <span className={styles.passwordToggleText}>Ver</span>
                                        </div>
                                    </div>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        className={styles.inputField}
                                        aria-label="Contraseña"
                                        required
                                    />
                                    <button type="submit" className={styles.signInButton}>
                                        Iniciar sesión
                                    </button>
                                </form>
                                <div className={styles.optionsContainer}>
                                    <div className={styles.rememberMe}>
                                        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/251c8bf9972d7e36f3e08d6968e3fcf0cb33e0c099d1415767230deb2f1df002?apiKey=7863fbeada814cc6944fd546413d7a2e&" alt="" className={styles.passwordToggleIcon} />
                                        <span className={styles.rememberMeText}>Recordarme</span>
                                    </div>
                                    <a href="#" className={styles.helpLink}>
                                        Ayuda
                                    </a>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
