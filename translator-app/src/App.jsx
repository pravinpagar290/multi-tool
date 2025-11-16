import React from "react"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Translator from "./pages/Translator"
import GenerateString from "./pages/RandomString"
import { Route, Router, Routes } from "react-router-dom"
function App() {
  
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/translate" element={<Translator/>}/>
        <Route path="/generate" element={<GenerateString/>}/>
      </Routes>
    </>
  )
}

export default App
