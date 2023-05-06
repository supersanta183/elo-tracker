import '../styles/globals.css'
import type { AppProps } from 'next/app'
import React from 'react'
import Link from 'next/link'

export default function App({ Component, pageProps }: AppProps) {
  
  return (
    <div>
      <div className='navbar bg-base-100'>
          <div className='btn-group btn-group-vertical lg:btn-group-horizontal'>
            <Link className='btn w-full' href='/'>Home</Link>
            <Link className='btn w-full' href='/Players'>Players</Link>
            <Link className='btn w-full' href='/Matches'>Matches</Link>
          </div>
        </div>
      <Component {...pageProps}/>
    </div>
  )
}
