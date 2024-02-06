import ArticlesList from "./ArticlesList";
import DetailedArticleCard from "./DetailedArticleCard";
import {Outlet } from "react-router-dom";

export default function ArticlesManager() {
  return (
    <section className="articles-manager">
      <Outlet />
    </section>
  );
}
