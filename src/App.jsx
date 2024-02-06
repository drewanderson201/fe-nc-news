import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from "./components/Header";
import ArticlesManager from './components/ArticlesManager';
import Navigation from './components/Navigation';

import { Routes, Route } from "react-router-dom";




function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <Routes>
        <Route path="/nav" element={<Navigation />} />
        <Route path="*" element={<ArticlesManager />} />
      </Routes>
    </>
  );
}

export default App
