import ArticleCard from "./ArticleCard";
import Loading from "./Loading";
import Error from "./Error";
import { useState, useEffect } from "react";
import { getArticles } from "../utils/api";

export default function ArticlesList() {
  const [articlesData, setArticlesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);




  useEffect(() => {
    getArticles().then((data) => {
      const articles = data.articles
      setArticlesData(articles);
      setIsLoading(false);
    }).catch((error)=>{
      const errMsg = error.response.data.msg;
      setIsError(true)
      setError(errMsg);
      setIsLoading(false)
    });
  }, []);

  if (isLoading) return <Loading/>;

  if (isError) return <Error error={error} />;

  return (
    <div>
      <h2>Articles</h2>
      <ul>
        <hr />
        {articlesData.map((article) => {
          return <ArticleCard article={article} key={article.article_id} />;
        })}
      </ul>
    </div>
  );
}
