import ArticleCard from "./ArticleCard";
import Loading from "./Loading";
import Error from "./Error";
import Dropdown from "./Dropdown";
import { useState, useEffect } from "react";
import { getArticles } from "../utils/api";
import { useParams, useSearchParams } from "react-router-dom";


export default function ArticlesList() {
  const [articlesData, setArticlesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("created_at");
  const [orderBy, setOrderBy] = useState("desc");
  const {topic} = useParams()

  const [searchParams, setSearchParams] = useSearchParams()
  const sortByQuery = searchParams.get("sort-by");
  const orderQuery = searchParams.get("order-by");

  const sortByDropdown = {
    label: "Sort By:",
    id: "sort-by",
    options: [
      ["date created", "created_at"],
      ["column count", "comment_count"],
      ["vote count", "votes"],
      ["author", "author"],
      ["topic", "topic"],
    ],
  };

    const orderByDropdown = {
      label: "Order By:",
      id: "order-by",
      options: [
        ["asc", "asc"],
        ["desc", "desc"],
      ],
    };
  




  useEffect(() => {
    getArticles(undefined, topic, sortByQuery, orderQuery)
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
  }, [sortBy, orderBy]);

  if (isLoading) return <Loading/>;

  if (isError) return <Error error={error} />;



  return (
    <div>
      {topic ? (
        <h2 className="articles-header">
          {topic[0].toUpperCase() + topic.slice(1).toLowerCase()}
        </h2>
      ) : (
        <h2 className="articles-header">Articles</h2>
      )}
      <Dropdown
        dropdownConfig={sortByDropdown}
        stateValue={sortBy}
        setStateValue={setSortBy}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
      <Dropdown
        dropdownConfig={orderByDropdown}
        stateValue={orderBy}
        setStateValue={setOrderBy}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />

      {articlesData.length === 0 ? (
        <p>Sorry there are currently no articles for this topic</p>
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
