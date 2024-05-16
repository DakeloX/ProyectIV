"use client";
import styles from "./styles/home.module.css";
import { useSession } from "next-auth/react";
import DonadorHome from "../components/homeView/Donador";
import FundacionHome from "../components/homeView/Fundacion";

export default function Home() {
  const { data: session, status } = useSession();
  console.log(session);
  const typeUser = session?.user?.userType;
  const nombre = session?.user?.name;

  // Opcionalmente, puedes manejar el estado de carga
  if (status === "loading") {
    return <div>Cargando...</div>;
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div>
          
          {session ? (
            <>
              <h2>Bienvenido(a) {nombre}</h2>
            </>
          ) : (
            <><h2>Bienvenido a nuestra plataforma</h2></>
          )}
          <p>Encuentra todo lo que necesitas para...</p>
          {/* Descomentar para ver los datos de sesión */}
          {/* <pre>
            <code>{JSON.stringify(session, null, 2)}</code>
          </pre> */}
        </div>
        <div className={styles.imagesContainer}>
          <img src="/img/donacion1.jpg" alt="Imagen 1" className={styles.image} />
          <img src="/img/donacion2.jpg" alt="Imagen 2" className={styles.image} />
          <img src="/img/donacion3.jpg" alt="Imagen 3" className={styles.image} />

          {/* Renderiza el componente correspondiente basado en el tipo de usuario */}
          {session ? (
            <>
              {typeUser === 'user' && <DonadorHome />}
              {typeUser === 'fundacion' && <FundacionHome />}
            </>
          ) : (
            <></>
          )}
        </div>
      </main>
    </div>
  );
}
