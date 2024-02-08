import { useState, useEffect } from "react";
import Loading from "./Loading";
import Error from "./Error";
import TopicCard from "./TopicCard";
import { getTopics } from "../utils/api";
import { Link } from "react-router-dom";


export default function Navigation() {
    const [topicData, setTopicData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);


    useEffect(() => {
      getTopics()
        .then((data) => {
          const topics = data.topics;
          setTopicData(topics);
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

  return (
    <div>
      <hr className="topics-divider" />
      <h2 className="navigation-header">Topics</h2>
      <ul>
        <Link to={`/articles`} key="all" className="topic-link">
          <p>All</p>
        </Link>
        {topicData.map((topic) => {
          return <TopicCard key={topic.slug} topic={topic} />;
        })}
      </ul>
      <hr className="topics-divider" />
    </div>
  );
}
