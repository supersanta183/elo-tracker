import React from 'react'
import Link from 'next/link'

function Navbar() {
  return (
    <div className="navbar bg-base-100">
        <div className="navbar-start">
          <ul className="menu menu-horizontal px-1">
            <li><Link href="/" className=''>Home</Link></li>
            <li tabIndex={0}>
              <a className=''>
                Bordfodbold
              </a>
              <ul className="menu dropdown-content shadow bg-base-100 rounded-box z-20">
                <li><Link href='/Bordfodbold' className=''>Ranking</Link></li>
                <li><Link href='/Bordfodbold/Matches' className=''>Matches</Link></li>
              </ul>
            </li>
            <li tabIndex={0}>
              <a className=''>Bordtennis</a>
              <ul className="menu dropdown-content shadow bg-base-100 rounded-box z-20">
                <li><Link href='/Bordtennis' className=''>Ranking</Link></li>
                <li><Link href='/Bordtennis/Matches' className=''>Matches</Link></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
  )
}

export default Navbar