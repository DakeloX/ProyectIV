import Header from '@/components/Header';
import SessionAuthProvider from './contexts/SessionAuthProvider';

export const metadata = {
  title: 'Donapp'
}

export default function RootLayout({ children }) {
return (
    <html lang="en" >
        <title>{metadata.title}</title>
        <link rel="icon" href="/img/logo_donap.ico" />
      <body>

      <Header/>
            <SessionAuthProvider>
        {children}
        </SessionAuthProvider>
      </body>
    </html>
  )
}
