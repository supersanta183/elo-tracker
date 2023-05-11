import '../styles/globals.css'
import type { AppProps } from 'next/app'
import React from 'react'
import Link from 'next/link'
import Navbar from '@/components/app/NavbarEmilio183'
import Hamburgermenu from '@/components/app/HamburgermenuEmilio183'

export default function App({ Component, pageProps }: AppProps) {

  return (
    <div className=''>
      <div className='md:hidden'>
        <Hamburgermenu/>
      </div>
      <div className='hidden md:flex'>
        <Navbar/>
      </div>
      <Component {...pageProps} />
    </div>
  )
}
