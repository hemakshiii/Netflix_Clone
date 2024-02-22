import React from "react";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import {BrowserRouter , Route, Routes } from  'react-router-dom';
import "./Components/Navbar.scss"
import "./Components/Home.scss"
import { Movies } from "./Components/Home";

import "./App.scss"
function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      
      <Routes>
        <Route path="/" element={<Home/>} />   
        <Route path="/movies" element={<Movies/>} />   
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
