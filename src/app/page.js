"use client"
import { useState } from 'react';
import styles from "./styles/home.module.css";

export default function Home() {
  const [isLoggedIn] = useState(false); // Estado para determinar si el usuario está conectado

  const handleLogout = () => {
    // Lógica para cerrar sesión
    IsLoggedIn(false); // Actualiza el estado para indicar que el usuario ha cerrado sesión
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <img src="/img/logo_donap.jpg" alt="Logo" className={styles.logoImage} />
          <h1 className={styles.logoText}>DonApp</h1>
        </div>
        <nav className={styles.navLinks}>
          <a href="/" className={styles.navLink}>Inicio</a>
          <a href="/donaciones" className={styles.navLink}>Donaciones</a>
          <a href="/fundaciones" className={styles.navLink}>Fundaciones</a>
        </nav>
        <div className={styles.authLinks}>
        {isLoggedIn ? (
          <>
            <a href="#" className={styles.loginLink} onClick={handleLogout}>Cerrar sesión</a>
          </>
        ) : (
          <>
            <a href="/login" className={styles.loginLink}>Iniciar sesión</a>
            <a href="/register" className={styles.registerLink}>Registro</a>
          </>
        )}
        </div>
      </header>
      <main className={styles.main}>
        <div>
          <h2>Bienvenido a nuestra plataforma</h2>
          <p>Encuentra todo lo que necesitas para...</p>
        </div>
        <div className={styles.imagesContainer}>
          <img src="/img/donacion1.jpg" alt="Imagen 1" className={styles.image} />
          <img src="/img/donacion2.jpg" alt="Imagen 2" className={styles.image} />
          <img src="/img/donacion3.jpg" alt="Imagen 3" className={styles.image} />
        </div>
      </main>
    </div>
  );
}
