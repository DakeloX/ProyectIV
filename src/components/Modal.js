// components/Modal.js
import React from 'react';
import styles from '@/app/styles/Modal.module.css';

const Modal = ({ isOpen, onClose, onSubmit, onChange, resetEmail, newPassword, confirmPassword }) => {
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
            value={resetEmail}
            onChange={onChange}
            required
          />
          <label htmlFor="resetEmail">Nueva contraseña:</label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={newPassword}
            onChange={onChange}
            required
          />
          <label htmlFor="resetEmail">Confirmar contraseña:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
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
