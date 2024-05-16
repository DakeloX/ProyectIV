"use client";
import styles from "./styles/home.module.css";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div>
          {status === "authenticated" ? (
            <h2>Bienvenido {session.user.name}</h2>
          ) : (
            <h2>Bienvenido a nuestra plataforma</h2>
          )}
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
