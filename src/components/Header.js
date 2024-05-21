// Header.js
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import styles from '@/app/styles/Header.module.css';
import { getServerSession } from 'next-auth/next';
import Link from 'next/link';

async function Header() {
  const session = await getServerSession(authOptions);
  const userType = session?.user?.userType;
  
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/" className={styles.logoLink}>
          <img src="/img/logo_donap.jpg" alt="Logo" className={styles.logoImage} />
          <h1 className={styles.logoText}>DonApp</h1>
        </Link>
      </div>
      <nav className={styles.navLinks}>
        <Link href="/" className={styles.navLink}>Inicio</Link>

        {!session?.user ? (
              <></>
       ) : (
        <Link href="/pages/donaciones" className={styles.navLink}>Donaciones</Link>

      )}

        <Link href="/pages/fundaciones" className={styles.navLink}>Fundaciones</Link>
        {session?.user?.userType === 'fundacion' && (
          <Link href="/pages/f_options" className={styles.navLink}>Administración</Link>
        )}
      </nav>

      {!session?.user ? (
        <div className={styles.authLinks}>
          <Link href="/pages/auth/login" className={styles.loginLink}>Iniciar sesión</Link>
          <Link href="/pages/auth/register" className={styles.registerLink}>Registro</Link>
        </div>
      ) : (
        <div className={styles.authLinks}>
          <Link href="/pages/auth/logout" className={styles.loginLink}>Cerrar sesión</Link>
        </div>
      )}
    </header>
  );
}

export default Header;