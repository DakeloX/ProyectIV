// components/Modal.js
import React from 'react';
import styles from './../styles/Modal.module.css';

const Modal = ({ isOpen, onClose, onSubmit, onChange, email }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button onClick={onClose} className={styles.closeButton}>X</button>
        <h2>Cambiar contraseña</h2>
        <form onSubmit={onSubmit}>
          <label htmlFor="resetEmail">Tu correo electrónico:</label>
          <input
            type="email"
            id="resetEmail"
            name="resetEmail"
            value={email}
            onChange={onChange}
            required
          />
          <button type="submit">Enviar enlace de restablecimiento</button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
