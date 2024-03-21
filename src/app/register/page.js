import styles from "./../styles/register.module.css";

export default function Register() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <nav className={styles.navLinks}>
            <a href="#" className={styles.navLink}>¡Conocenos!</a>
            <a href="#" className={styles.navLink}>Registro</a>
            <a href="#" className={styles.navLink}>Boletin Informativo</a>
            <a href="#" className={styles.navLink}>Reflexion del Dia</a>
          </nav>
          <div className={styles.profileIcon} aria-label="Profile icon"></div>
        </div>
      </header>

      <main className={styles.mainContent}>
        <div className={styles.columns}>
          <div className={styles.imageColumn}>
            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/05691fc4f7f3f769981cfafee8306408df2328a661b1e7a5317eb0cc563ec1ba?apiKey=7863fbeada814cc6944fd546413d7a2e&" alt="Main image" className={styles.mainImage} />
          </div>
          <div className={styles.contentColumn}>
            <div className={styles.contentWrapper}>
              <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/e84c41a2c8fe02d1cfa58101a47318af826742afcae464912b417ee3b4f6b88c?apiKey=7863fbeada814cc6944fd546413d7a2e&" alt="Close icon" className={styles.closeIcon} />
              <footer className={styles.footer}>
                <div className={styles.footerLinks}>
                  <a href="#" className={styles.footerLink}>Iniciar sesion</a>
                  <a href="#" className={styles.registerLink}>Registro</a>
                  <a href="#" className={styles.footerLink}>Contactenos</a>
                </div>
              </footer>
              <section className={styles.registrationContainer}>
              <h1 className={styles.registrationTitle}>Registro</h1>
              <form>
                <label htmlFor="organization" className={styles.organizationLabel}>
                  Nombre de la organizacion o empresa.
                </label>
                <input
                  type="text"
                  id="organization"
                  className={styles.inputField}
                  aria-label="Nombre de la organizacion o empresa."
                  required
                />
                <label htmlFor="email" className={styles.emailLabel}>
                  Correo Electronico
                </label>
                <input
                  type="email"
                  id="email"
                  className={styles.inputField}
                  aria-label="Correo Electronico"
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
                  className={styles.inputField}
                  aria-label="Contraseña"
                  required
                />
                <button type="submit" className={styles.signInButton}>
                  Sign in
                </button>
              </form>
              <div className={styles.optionsContainer}>
                <div className={styles.rememberMe}>
                  <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/251c8bf9972d7e36f3e08d6968e3fcf0cb33e0c099d1415767230deb2f1df002?apiKey=7863fbeada814cc6944fd546413d7a2e&" alt="" className={styles.passwordToggleIcon} />
                  <span className={styles.rememberMeText}>Remember me</span>
                </div>
                <a href="#" className={styles.helpLink}>
                  Ayuda
                </a>
              </div>
              </section>
              <section className={styles.loginSection}>
                <p className={styles.loginText}>¿Ya tienes una cuenta?</p>
                <a href="#" className={styles.loginButton}>Iniciar sesion</a>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}