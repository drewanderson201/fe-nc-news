import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from "./components/Header";
import ArticlesManager from './components/ArticlesManager';


function App() {
  const [count, setCount] = useState(0)

  return (
    <> 
    <Header/>
    <ArticlesManager/>
    </>
  )
}

export default App
