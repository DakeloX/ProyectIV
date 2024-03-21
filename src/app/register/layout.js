import styles from "./../styles/register.module.css";

export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={styles.fondo}>
      <body>{children}</body>
    </html>
  )
}
