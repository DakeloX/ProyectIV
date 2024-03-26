<<<<<<< HEAD
import styles from "./../styles/register.module.css";

export default function Register() {
  return (
    <main className={styles.fondo}>
      <div>
        Pagina de Registro
      </div>
    </main>
  );
}
=======
'use client'
import { useEffect, useState } from 'react';
import styles from "./../styles/register.module.css";

export default function Register() {
  const [rolesData, setRolesData] = useState([]);
  const [selectedRole, setSelectedRole] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/roles');
        if (!response.ok) {
          throw new Error('Failed to fetch roles');
        }
        const data = await response.json();
        setRolesData(data);
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    };

    fetchData();
  }, []);

  function handleChange(event) {
    setSelectedRole(event.target.value);
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <nav className={styles.navLinks}>
            <a href="#" className={styles.navLink}>¡Conócenos!</a>
            <a href="#" className={styles.navLink}>Registro</a>
            <a href="#" className={styles.navLink}>Boletín Informativo</a>
            <a href="#" className={styles.navLink}>Reflexión del Día</a>
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
                  <a href="/login" className={styles.footerLink}>Iniciar sesión</a>
                  <a href="#" className={styles.registerLink}>Registro</a>
                  <a href="#" className={styles.footerLink}>Contáctenos</a>
                </div>
              </footer>
              <section className={styles.registrationContainer}>
                <h1 className={styles.registrationTitle}>Registro</h1>
                <form>
                  <label htmlFor="organization" className={styles.organizationLabel}>
                    Nombre de usuario u organización
                  </label>
                  <input
                    type="text"
                    id="username"
                    className={styles.inputField}
                    aria-label="Nombre de usuario o organización."
                    required
                  />
                  <label htmlFor="telefono" className={styles.organizationLabel}>
                    Teléfono
                  </label>
                  <input
                    type="text"
                    id="telefono"
                    className={styles.inputField}
                    aria-label="Teléfono"
                    required
                  />

                  <div>
                    <label htmlFor="rol">Selecciona un rol:</label>
                    <select id="rol" value={selectedRole} onChange={handleChange}>
                      <option value="">Selecciona un rol</option>
                      {rolesData.map((rol) => (
                        <option key={rol.id} value={rol.id}>
                          {rol.nombre}
                        </option>
                      ))}
                    </select>
                  </div>

                  <label htmlFor="email" className={styles.emailLabel}>
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    id="email"
                    className={styles.inputField}
                    aria-label="Correo Electrónico"
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
                    Iniciar sesión
                  </button>
                </form>
                <div className={styles.optionsContainer}>
                  <div className={styles.rememberMe}>
                    <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/251c8bf9972d7e36f3e08d6968e3fcf0cb33e0c099d1415767230deb2f1df002?apiKey=7863fbeada814cc6944fd546413d7a2e&" alt="" className={styles.passwordToggleIcon} />
                    <span className={styles.rememberMeText}>Recordarme</span>
                  </div>
                  <a href="#" className={styles.helpLink}>
                    Ayuda
                  </a>
                </div>
              </section>
              <section className={styles.loginSection}>
                <p className={styles.loginText}>¿Ya tienes una cuenta?</p>
                <a href="#" className={styles.loginButton}>Iniciar sesión</a>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
>>>>>>> c674486757a712899f84514e8ce93c273b7f918e
