import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'

import { Link } from 'react-router-dom'
import { Routes } from './routes'

export default function App() {
  return (
    <>
    <div>
      <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">
          <Link to="/" className='text-white'>Barang</Link>
        </div>
        <ul className="flex space-x-6 text-white">
          <li>
            <Link to="/" className="text-white font-bold">Home</Link>
          </li>
          <li>
            <Link to="/posts" className="text-white font-bold">Product</Link>
          </li>
          <li>
            <Link to="/posts/create" className="text-white font-bold">Create</Link>
          </li>
        </ul>
      </div>
    </nav>
    </div>

    <Routes/>
    </>
  )
}
