import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

export default function TopicCard({ topic }) {
  const { theme } = useContext(ThemeContext);
  const formattedTopicName =
    topic.slug[0].toUpperCase() + topic.slug.slice(1).toLowerCase();

  return (
    <>
      <Link to={`/articles/topic/${topic.slug}`} className={`topic-link ${theme}`}>
        <p>{formattedTopicName}</p>
      </Link>
    </>
  );
}
