import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ArticlesManager from "./components/ArticlesManager";
import Navigation from "./components/Navigation";
import ArticlesList from "./components/ArticlesList";
import DetailedArticleCard from "./components/DetailedArticleCard";
import Error from "./components/Error";
import { Routes, Route, Navigate } from "react-router-dom";
import UserContext from "./contexts/UserContext";
import ThemeContext from "./contexts/ThemeContext";
import UserList from "./components/UsersList";

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [theme, setTheme] = useState("light");


  return (
    <>
      <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
        <ThemeContext.Provider value={{theme, setTheme}}>
        <Header />
        <Routes>
          <Route path="*" element={<Error error={"404: Page Not Found"} />} />
          <Route path="/" element={<Navigate to="/articles" />} />
          <Route path="nav" element={<Navigation />}></Route>
          <Route path="users" element={<UserList />}></Route>
          <Route path="articles" element={<ArticlesManager />}>
            <Route path="/articles/" element={<ArticlesList />} />
            <Route path="/articles/topic/:topic" element={<ArticlesList />} />

            <Route
              path="/articles/:article_id"
              element={<DetailedArticleCard />}
            />
          </Route>
        </Routes>
        <Footer/>
        </ThemeContext.Provider>
      </UserContext.Provider>
    </>
  );
}

export default App;
