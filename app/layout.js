"use client"

import './globals.css'
import { Inter } from 'next/font/google'
import Navigation from "@/components/Navigation";

import { ToastContainer, toas } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"

import FinanceContextProvider from '@/lib/store/finance-context';
import AuthContextProvider from '@/lib/store/auth-context';

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Finance Tracker</title>
        <meta name='description' content='Application for you to monitor and control your personal finances!' />
      </head>
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
