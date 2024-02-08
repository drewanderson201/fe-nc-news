import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./components/Header";
import ArticlesManager from "./components/ArticlesManager";
import Navigation from "./components/Navigation";
import ArticlesList from "./components/ArticlesList";
import DetailedArticleCard from "./components/DetailedArticleCard";
import Error from "./components/Error";
import { Routes, Route, Navigate } from "react-router-dom";
import UserContext from "./contexts/UserContext";

function App() {

  const [loggedInUser, setLoggedInUser] = useState({
    username: "tickle122",
    name: "Tom Tickle",
    avatar_url:
      "https://vignette.wikia.nocookie.net/mrmen/images/d/d6/Mr-Tickle-9a.png/revision/latest?cb=20180127221953",
  });

  return (
    <>
      <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
        <Header />
        <Routes>
          <Route path="*" element={<Error error={"404: Page Not Found"}/>} />
          <Route path="/" element={<Navigate to="/articles" />} />
          <Route path="nav" element={<Navigation />}></Route>
          <Route path="articles" element={<ArticlesManager />}>
            <Route path="/articles/" element={<ArticlesList />} />
            <Route path="/articles/topic/:topic" element={<ArticlesList />} />

            <Route
              path="/articles/:article_id"
              element={<DetailedArticleCard />}
            />
          </Route>
        </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App;
