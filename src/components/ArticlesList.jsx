import ArticleCard from "./ArticleCard";
import Loading from "./Loading";
import Error from "./Error";
import { useState, useEffect } from "react";
import { getArticles } from "../utils/api";
import { useParams } from "react-router-dom";


export default function ArticlesList() {
  const [articlesData, setArticlesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);
  const {topic} = useParams()




  useEffect(() => {
    getArticles(undefined,topic)
      .then((data) => {
        const articles = data.articles;
        setArticlesData(articles);
        setIsLoading(false);
      })
      .catch((error) => {
        const errMsg = error.response.data.msg;
        setIsError(true);
        setError(errMsg);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <Loading/>;

  if (isError) return <Error error={error} />;



  return (
    <div>
      {topic ? (
        <h2>{topic[0].toUpperCase() + topic.slice(1).toLowerCase()}</h2>
      ) : (
        <h2>Articles</h2>
      )}
      {articlesData.length === 0 ? (
        <p>
          Sorry there are currently no articles for this topic
        </p>
      ) : (
        <ul className="articles-list">
          <hr className="articles-divider" />
          {articlesData.map((article) => {
            return <ArticleCard article={article} key={article.article_id} />;
          })}
        </ul>
      )}
    </div>
  );
}
