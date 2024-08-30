import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Home, Login, Register, Devices, Settings } from './pages'
import './App.scss'

function App() {
  return (
    <div id="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/devices" element={<Devices />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </div>
  )
}

export default App
