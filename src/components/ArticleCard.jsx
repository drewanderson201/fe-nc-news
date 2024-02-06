import { Link, } from "react-router-dom";

export default function ArticleCard({ article }) {

  const formattedTopic = article.topic[0].toUpperCase() + article.topic.slice(1).toLowerCase();

  return (
    <>
      <Link
        to={`/articles/${article.article_id}`}
        className="link-article-list"
      >
        <div>
          <img
            className="img-article-list"
            src={article.article_img_url}
            alt={`Article Image for ${article.title}`}
          />
          <h3>{article.title}</h3>
          <p>By {article.author}</p>
          <p>{formattedTopic}</p>
          <p>Comments: {article.comment_count}</p>
          <p>Votes: {article.votes}</p>
        </div>
      </Link>
      <hr />
    </>
  );
}
