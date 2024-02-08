import { Link } from "react-router-dom";

export default function TopicCard({ topic }) {

    const formattedTopicName = topic.slug[0].toUpperCase() + topic.slug.slice(1).toLowerCase();
  return (
    <>
      <Link to={`/articles/topic/${topic.slug}`} className="topic-link">
        <p>{formattedTopicName}</p>
      </Link>
    </>
  );

}
