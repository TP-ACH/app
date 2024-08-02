import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Home, Login, Register } from './pages'
import './App.scss'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  )
}

export default App
