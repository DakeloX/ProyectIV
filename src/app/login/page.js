import styles from "./../styles/login.module.css";

export default function Login() {
  return (
    <div className={styles.container}>
      <section className={styles.heroSection}>
        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/7f2ed6cae3de7997d2382d9fcc66672722811dc0fa28d506483d5a0d2be27944?apiKey=e160dde0fc0f401c873489b4f6f8cae7&" alt="Hero Image" className={styles.heroImage} />
        <div className={styles.mainContent}>
          <div className={styles.contentWrapper}>
            <div className={styles.leftColumn}>
              <div className={styles.imageSection}>
                <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/9451765f598c6e430d29f1a1390cb69aebb634d9fd645a8ef4521c090c8b3522?apiKey=e160dde0fc0f401c873489b4f6f8cae7&" alt="Image 1" className={styles.image1} />
                <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/9ee03f308c19ce8073e066895c26905148d837abd955fd9dead4980bef295f2c?apiKey=e160dde0fc0f401c873489b4f6f8cae7&" alt="Image 2" className={styles.image2} />
              </div>
            </div>
            <div className={styles.rightColumn}>
              <div className={styles.loginSection}>
                <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/75ba0a40ae23ef12a9557906bc46961c9137148a93e120e3fcb8291856d4f78f?apiKey=e160dde0fc0f401c873489b4f6f8cae7&" alt="Close Icon" className={styles.closeIcon} />
                <nav className={styles.navigation}>
                  <div className={styles.navLinks}>
                    <a href="#" className={styles.loginLink}>Iniciar sesión</a>
                    <a href="#" className={styles.registerLink}>Registro</a>
                    <a href="#" className={styles.contactLink}>Contáctenos</a>
                  </div>
                </nav>
                <h2 className={styles.loginHeading}>Iniciar sesión</h2>
                <label htmlFor="email" className={styles.emailLabel}>Correo Electrónico</label>
                <input type="email" id="email" className={styles.emailInput} />
                <div className={styles.passwordWrapper}>
                  <label htmlFor="password" className={styles.passwordLabel}>Contraseña</label>
                  <div className={styles.passwordToggle}>
                    <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/f59493de73ab9f0f002cc630b00987a319016a04052d04e4ab29736c5333bab8?apiKey=e160dde0fc0f401c873489b4f6f8cae7&" alt="Eye Icon" className={styles.eyeIcon} />
                    <span className={styles.toggleText}>Ver</span>
                  </div>
                </div>
                <input type="password" id="password" className={styles.passwordInput} />
                <a href="#" className={styles.forgotPassword}>Olvidé mi contraseña</a>
                <button className={styles.loginButton}>Iniciar sesión</button>
                <div className={styles.signupSection}>
                  <p className={styles.signupText}>¿No tienes una cuenta?</p>
                  <button className={styles.signupButton}>Crear cuenta</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
