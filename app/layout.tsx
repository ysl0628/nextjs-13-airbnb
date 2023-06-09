import './globals.css'
import { Nunito } from 'next/font/google'
import ClientOnly from './components/ClientOnly'
import getCurrentUser from './actions/getCurrentUser'
import ToasterProvider from './providers/ToasterProvider'

import Navbar from './components/navbar/Navbar'
import RentModal from './components/modals/RentModal'
import LoginModal from './components/modals/LoginModal'
import SearchModal from './components/modals/SearchModal'
import RegisterModal from './components/modals/RegisterModal'

export const metadata = {
  title: 'Reservation',
  description: 'Reservation for your trip'
}
const font = Nunito({ subsets: ['latin'] })

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser()

  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <SearchModal />
          <LoginModal />
          <RegisterModal />
          <RentModal />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  )
}
