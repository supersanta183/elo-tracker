import React from 'react'
import Link from 'next/link'

function Hamburgermenu() {
    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost btn-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu dropdown-content mt-3 p-2 shadow bg-base-200 rounded-box w-52">
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
        </div>
    )
}

export default Hamburgermenu