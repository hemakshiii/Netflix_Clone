import React from "react";
import Navbar from "./Components/Navbar";
import Home, { MyList } from "./Components/Home";
import {BrowserRouter , Route, Routes } from  'react-router-dom';
import "./Components/Navbar.scss"
import "./Components/Home.scss"
import { Movies } from "./Components/Home";
import {Tv} from "./Components/Home"

import "./App.scss"
function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      
      <Routes>
        <Route path="/" element={<Home/>} />   
        <Route path="/movies" element={<Movies/>} />   
        <Route path="/tvshows" element={<Tv/>} />   
        <Route path="/mylist" element={<MyList/>} />   
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
