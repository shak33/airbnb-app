import { Nunito } from 'next/font/google';

import './globals.css';

import Navbar from './components/navbar/Navbar';
import Modal from './components/modals/Modal';

const font = Nunito({ subsets: ['latin'] });

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Modal isOpen title="Modal title" />
        <Navbar />
        {children}
      </body>
    </html>
  )
};