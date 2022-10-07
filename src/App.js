import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Router, Route, Routes } from 'react-router-dom'
import BoxSearch from './components/BoxSearch'
import { Home }  from "./pages/Home";
import SearchPage  from "./pages/SearchPage";
import SearchProduct from './pages/DetailsItems'
import './styles/Home.scss'

function App() {
  return (
    <>
      <BoxSearch/>
      <div className="container-main">
        <Routes>
          <Route exact path="/items/:id" element={<SearchProduct/>} />
          <Route exact path="/items" element={<SearchPage/>} />
          <Route exact path="/" element={<Home/>} />
        </Routes> 
      </div>
    </>
  );
}

export default App;
