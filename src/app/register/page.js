'use client'
import { useEffect, useState, useRef } from 'react';
import { sql } from '@vercel/postgres';
import styles from "./../styles/register.module.css";
import Slider from "react-slick";
import Image from 'next/image';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Register() {
  // Estado para almacenar los roles
  const [rolesData, setRolesData] = useState([]);
  const [formData, setFormData] = useState({
    username: '',
    id_user: '',
    telefono: '',
    email: '',
    password: '',
    selectedRole: '', // Asegúrate de tener este campo para capturar el rol seleccionado
  });

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const { rows } = await sql`SELECT * FROM roles`;
        setRolesData(rows);
        console.log('Roles cargados con éxito:', rows);
      } catch (error) {
        console.error('Error al cargar roles:', error);
      }
    };

    fetchRoles();
  }, []); 

  // Manejador para cambios en los inputs del formulario
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // Manejador para el envío del formulario
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/users', formData); // Usa Axios para enviar los datos del formulario
      console.log('Registro exitoso:', response.data);
      // Aquí podrías redirigir al usuario a otra página o mostrar un mensaje de éxito.
    } catch (error) {
      console.error('Error al registrar:', error);
      // Aquí podrías mostrar un mensaje de error al usuario.
    }
  };

  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (next) => setCurrentSlide(next)
  };

  const goToNextSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <nav className={styles.navLinks}>
            <a href="#" className={styles.navLink}>¡Conócenos!</a>
            <a href="#" className={styles.navLink}>Registro</a>
            <a href="#" className={styles.navLink}>Boletín Informativo</a>
          </nav>
          <div className={styles.profileIcon} aria-label="Profile icon"></div>
        </div>
      </header>

      <main className={styles.mainContent}>
        <div className={styles.columns}>
          <div className={styles.imageColumn}>
            <div className={styles.sliderContent} onClick={goToNextSlide}>
              <Slider ref={sliderRef} {...settings}>
                <div>
                  <Image src="/img/donacion2.jpg" alt="" width={400} height={400} className={styles.sliderImg} />
                </div>
                <div>
                  <Image src="/img/donacion3.jpg" alt="" width={400} height={400} className={styles.sliderImg} />
                </div>
                <div>
                  <Image src="/img/donacion1.jpg" alt="" width={400} height={400} className={styles.sliderImg} />
                </div>
              </Slider>
            </div>
          </div>
          <div className={styles.contentColumn}>
            <div className={styles.contentWrapper}>
              <div className={styles.footer}>
                <div className={styles.footerLinks}>
                  <a href="/login" className={styles.footerLink}>Iniciar sesión</a>
                  <a href="#" className={styles.registerLink}>Registro</a>
                  <a href="#" className={styles.footerLink}>Contáctenos</a>
                </div>
              </div>
              <section className={styles.registrationContainer}>
                <h1 className={styles.registrationTitle}>Registro</h1>
                <form onSubmit={handleSubmit}>
                  <label htmlFor="organization" className={styles.organizationLabel}>
                    Nombre de usuario u organización
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className={styles.inputField}
                    aria-label="Nombre de usuario o organización."
                    required
                  />
                  <label htmlFor="id_user" className={styles.organizationLabel}>
                    Número de identificación
                  </label>
                  <input
                    type="text"
                    id="id_user"
                    name="id_user"
                    value={formData.id_user}
                    onChange={handleChange}
                    className={styles.inputField}
                    aria-label="Número de identificación."
                    required
                  />
                  <label htmlFor="telefono" className={styles.organizationLabel}>
                    Teléfono
                  </label>
                  <input
                    type="text"
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    className={styles.inputField}
                    aria-label="Teléfono"
                    required
                  />

                  <div>
                    <label htmlFor="selectedRole">Selecciona un rol:</label>
                    <select
                      id="selectedRole"
                      name="selectedRole"
                      value={formData.selectedRole}
                      onChange={handleChange}
                    >
                      <option value="">Selecciona un rol</option>
                      {rolesData.map((rol) => (
                        <option key={rol.id_rol} value={rol.id_rol}>
                          {rol.nombre_rol}
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
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
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
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={styles.inputField}
                    aria-label="Contraseña"
                    required
                  />
                  <button type="submit" className={styles.signInButton}>
                    Regitrarme
                  </button>
                </form>
                <div className={styles.optionsContainer}>
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
