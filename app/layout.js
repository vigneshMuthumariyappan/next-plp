import { Goblin_One } from 'next/font/google'
import '@style/globals.css'
import NavBarStore from '@components/NavBar/NavBarStore'
import { ReduxProvider } from '@store/provider'
import 'bootstrap/dist/css/bootstrap.min.css';

const Gobline = Goblin_One({ subsets: ['latin'], weight: ['400'] })

export const metadata = {
  title: 'Home',
  description: 'E commerce web site',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={Gobline.className}>
          <ReduxProvider>
              <NavBarStore />
              {children}
          </ReduxProvider>
      </body>
    </html>
  )
}
