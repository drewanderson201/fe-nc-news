import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getArticles } from "../utils/api";
import Loading from "./Loading";
import Error from "./Error";
import CommentsList from "./CommentsList";


export default function DetailedArticleCard() {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);
  const [showComments, setShowComments] = useState(false);


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

  const formattedTopic = article.topic[0].toUpperCase() + article.topic.slice(1).toLowerCase();
  const formattedDate = new Date(article.created_at).toDateString();

  const handleCommentsButton = () => {
    showComments ? setShowComments(false) : setShowComments(true)
  }

  return (
    <div>
      <hr />

      <div>
        <p className="article-details">{formattedTopic}</p>
        <span className="details-divider"></span>
        <p className="article-details">{formattedDate}</p>
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
      <button className="comments-button" onClick={handleCommentsButton}>
        <p className="article-details">
          {showComments ? "Hide Comments" : "Show Comments"}
        </p>
        <span className="details-divider"></span>
        <p className="article-details">{article.comment_count}</p>
      </button>
      {showComments ? <CommentsList article_id={article_id} /> : null}
    </div>
  );
}
