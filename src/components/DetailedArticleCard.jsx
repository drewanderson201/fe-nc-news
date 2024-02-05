import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getArticles } from "../utils/api";
import Loading from "./Loading";
import Error from "./Error";

export default function DetailedArticleCard() {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    getArticles(article_id)
      .then((data) => {
        const article = data.article;
        setArticle(article);
        setIsLoading(false);
      })
      .catch((error) => {
        const errMsg = error.response.data.msg;
        setIsError(true);
        setError(errMsg);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <Loading />;

  if (isError) return <Error error={error} />;

  // const formattedDate = new Date(article.created_at * 1000).toDateString();
  // const formattedTime = new Date(forecast.dt * 1000).toTimeString();

  return (
    <div>
      <div>
        <p className="article-details">{article.topic.toUpperCase()}</p>
        <span className="details-divider"></span>
        <p className="article-details">
          {new Date(article.created_at).toDateString()}
        </p>
      </div>

      <h2>{article.title}</h2>
      <p>By {article.author}</p>
      <img
        className="img-article-main"
        src={article.article_img_url}
        alt={`Article Image for ${article.title}`}
      />
      <p>{article.body}</p>
      <p>Votes: {article.votes}</p>
      <p>Comments: {article.comment_count}</p>
    </div>
  );
}
