import ArticleCard from "./ArticleCard";
import Loading from "./Loading";
import Error from "./Error";
import Dropdown from "./Dropdown";
import PaginationButton from "./PaginationButton";
import { useState, useEffect } from "react";
import { getArticles } from "../utils/api";
import { useParams, useSearchParams } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

export default function ArticlesList() {
  const [articlesData, setArticlesData] = useState([]);
  const [articlesCount, setArticlesCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);
  const { topic } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const sortByQuery = searchParams.get("sort-by");
  const orderQuery = searchParams.get("order-by");
  const limitQuery = searchParams.get("limit");
  const pageQuery = searchParams.get("p");
  const { theme } = useContext(ThemeContext);



  const [sortBy, setSortBy] = useState(sortByQuery || "created_at");
  const [orderBy, setOrderBy] = useState(orderQuery || "desc");
  const [limitBy, setLimitBy] = useState(limitQuery || "15");
  const [pageBy, setPageBy] = useState(pageQuery ? pageQuery - 1 : 0);
  const [totalPageCount, setTotalPageCount] = useState(0);


  const sortByDropdown = {
    label: "Sort By:",
    id: "sort-by",
    options: [
      ["date created", "created_at"],
      ["comment count", "comment_count"],
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

  const articlesLimitDropdown = {
    label: "Articles per page:",
    id: "limit",
    options: [
      ["5", "5"],
      ["15", "15"],
      ["30", "30"],
      ["50", "50"],
    ],
  };

const pagesArray = []
for (let i = 1; i <= totalPageCount; i++) {
  pagesArray.push(i)
}

  useEffect(() => {
    getArticles(undefined, topic, sortBy, orderBy, limitBy, pageBy)
      .then((data) => {
        const articles = data.articles;
        const totalArticleCount = data.total_count;
        const totalPages = Math.ceil(
          Number(totalArticleCount) / Number(limitBy)
        );
        setArticlesData(articles);
        setArticlesCount(totalArticleCount);
        setTotalPageCount(totalPages);
        setIsLoading(false);
      })
      .catch((error) => {
        const errMsg = error.response.data.msg;
        setIsError(true);
        setArticlesCount(0);
        setError(errMsg);
        setIsLoading(false);
      });
  }, [sortBy, orderBy, limitBy, pageBy]);

  if (isLoading) return <Loading />;

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
      <Dropdown
        dropdownConfig={articlesLimitDropdown}
        stateValue={limitBy}
        setStateValue={setLimitBy}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        resetState={setPageBy}
      />
      <p className="articles-total-result">Total results: {articlesCount}</p>
      <div>
        {pagesArray.map((page) => {
          return (
            <PaginationButton
              key={page}
              page={page}
              stateValue={pageBy}
              setStateValue={setPageBy}
              searchParams={searchParams}
              setSearchParams={setSearchParams}
            />
          );
        })}
      </div>

      {articlesData.length === 0 ? (
        <p>Sorry there are currently no articles for this topic</p>
      ) : (
        <ul className="articles-list">
          <hr className={`articles-divider-${theme}`} />
          {articlesData.map((article) => {
            return <ArticleCard article={article} key={article.article_id} />;
          })}
        </ul>
      )}
      <div>
        {pagesArray.map((page) => {
          return (
            <PaginationButton
              key={page}
              page={page}
              stateValue={pageBy}
              setStateValue={setPageBy}
              searchParams={searchParams}
              setSearchParams={setSearchParams}
            />
          );
        })}
      </div>
    </div>
  );
}
