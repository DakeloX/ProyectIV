
import styles from "./styles/home.module.css";

export default function Home() {
  return (
    <main  className= {styles.main}>
      <div>
        Hola mundo
      </div>
      <a href="/login" className={styles.footerLink}>Iniciar sesión --  </a>
      <a href="/register" className={styles.registerLink}>  Registro</a>
    </main>
  );
}
