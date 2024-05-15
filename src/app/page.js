"use client";
import styles from "./styles/home.module.css";
import { useSession } from "next-auth/react";


export default function Home() {
  const { data: session, status } = useSession();
  //console.log({session, status});
  // const token = session?.user?.token;
  // console.log(token);


  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div>
          <h2>Bienvenido a nuestra plataforma</h2>
          <p>Encuentra todo lo que necesitas para...</p>
          {/* Descomentar para ver los datos de sesion */}
          {/* <pre>
        <code>{JSON.stringify(session, null, 2)}</code>
       </pre> */}
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
