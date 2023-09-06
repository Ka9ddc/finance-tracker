"use client"

import './globals.css'
import { Inter } from 'next/font/google'
import Navigation from "@/components/Navigation";

import { ToastContainer, toas } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"

import FinanceContextProvider from '@/lib/store/finance-context';
import AuthContextProvider from '@/lib/store/auth-context';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Finance Tracker',
  description: 'Aplicação criada para controlar suas finanças',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContextProvider>
          <FinanceContextProvider>
            <ToastContainer />
              <Navigation />
              {children}
          </FinanceContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  )
}
