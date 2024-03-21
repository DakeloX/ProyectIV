import styles from "./../styles/login.module.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={styles.fondo}>
      <body>{children}</body>
    </html>
  )
}
