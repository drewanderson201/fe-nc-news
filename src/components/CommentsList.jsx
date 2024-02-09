import { useState, useEffect } from "react";
import CommentCard from "./CommentCard";
import { getCommentsById } from "../utils/api";
import Loading from "./Loading";
import Error from "./Error";
import CommentForm from "./CommentForm";

export default function CommentsList({ article_id }) {
  const [commentsData, setCommentsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    getCommentsById(article_id)
      .then((data) => {
        const comments = data.comments;
        setCommentsData(comments);
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
      <CommentForm article_id={article_id} setCommentsData={setCommentsData} />




      <ul className="article-comments-list">
        {commentsData.map((comment) => {
          return (
            <CommentCard
              key={comment.comment_id}
              comment={comment}
              setCommentsData={setCommentsData}
            />
          );
        })}
      </ul>
    </div>
  );
}
