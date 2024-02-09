import { Link, } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

export default function ArticleCard({ article }) {
  const { theme } = useContext(ThemeContext);
  const formattedTopic = article.topic[0].toUpperCase() + article.topic.slice(1).toLowerCase();
  const formattedDate = new Date(article.created_at).toDateString();
  
  return (
    <>
      <Link
        to={`/articles/${article.article_id}`}
        className={`link-article-list ${theme}`}
      >
        <div>
          <img
            className="img-article-list"
            src={article.article_img_url}
            alt={`Article Image for ${article.title}`}
          />
          <h3>{article.title}</h3>
          <p>By {article.author}</p>
          <p>{formattedDate}</p>
          <p>{formattedTopic}</p>
          <p>Comments: {article.comment_count}</p>
          <p>Votes: {article.votes}</p>
        </div>
      </Link>
      <hr className={`articles-divider-${theme}`} />
    </>
  );
}
