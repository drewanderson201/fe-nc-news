import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from "./components/Header";
import ArticlesManager from './components/ArticlesManager';
import Navigation from './components/Navigation';
import ArticlesList from "./components/ArticlesList"
import DetailedArticleCard from "./components/DetailedArticleCard";

import { Routes, Route, Navigate} from "react-router-dom";





function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/articles" />} />
        <Route path="nav" element={<Navigation />} />
        <Route path="articles" element={<ArticlesManager />}>
          <Route path="/articles/" element={<ArticlesList />} />
          <Route
            path="/articles/:article_id"
            element={<DetailedArticleCard />}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App
