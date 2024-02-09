import ArticlesList from "./ArticlesList";
import DetailedArticleCard from "./DetailedArticleCard";
import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

export default function ArticlesManager() {
  const { theme } = useContext(ThemeContext);

  return (
    <section className={`articles-manager ${theme}`}>
      <Outlet />
    </section>
  );
}
