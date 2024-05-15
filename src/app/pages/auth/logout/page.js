/* LogoutConfirmation.js */
"use client";
import styles from "../../../styles/logout.module.css";
import { signOut } from "next-auth/react";

export default function LogoutConfirmation() {
  const handleSignOut = async () => {
    await signOut();
    // Después de cerrar sesión, redirigir al usuario a la página de inicio
    window.location.href = '/'; // Esto recarga la página
  };

  const handleCancel = () => {
    window.history.back(); // Esto lleva al usuario a la página anterior en el historial del navegador
  };

  
  return (
    <div className={styles.container}>
      <div className={styles.notification}>
        <p>¿Estás seguro de que deseas cerrar sesión?</p>
        <button onClick={handleSignOut}>Cerrar sesión</button>
        <button onClick={handleCancel} className={styles.cancel}>Cancelar</button>
      </div>
    </div>
  );
}

 
