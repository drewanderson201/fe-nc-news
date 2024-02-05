import ArticlesList from "./ArticlesList";
import DetailedArticleCard from "./DetailedArticleCard";
import { Routes, Route } from "react-router-dom";

export default function ArticlesManager() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<ArticlesList />} />
        <Route path="/articles/:article_id" element={<DetailedArticleCard />} />
      </Routes>
    </div>
  );
}
