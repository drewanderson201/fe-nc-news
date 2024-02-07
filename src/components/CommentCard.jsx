import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { deleteComment } from "../utils/api";
import Error from "./Error";

export default function CommentCard({ comment, setCommentsData }) {
  const { loggedInUser } = useContext(UserContext);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);

  const formattedDate = new Date(comment.created_at).toDateString();
  const formattedTime = new Date(comment.created_at).toTimeString().slice(0, 9);

  if (isError) return <Error error={error} />;

  const handleDeleteCommentButton = (comment_id) => {
    deleteComment(comment_id)
      .then((data) => {
      })
      .catch((error) => {
        const errMsg = error.response.data.msg;
        setIsError(true);
        setError(errMsg);
      });

    setCommentsData((currentComments) => {
      const updatedComments = [...currentComments];
      const removedCommentIndex = updatedComments.findIndex((comment) => comment.comment_id === comment_id );
      updatedComments.splice(removedCommentIndex, 1);
      return updatedComments;
    });
  };

  return (
    <li className="comments-comment">
      <p className="comment-author">{comment.author}</p>
      <p className="comment-created">
        {formattedDate} {formattedTime}
      </p>
      <p className="comment-body">{comment.body}</p>
      <p className="comment-votes">Votes: {comment.votes}</p>
      {loggedInUser.username === comment.author ? (
        <button className="comment-delete-button"
          onClick={() => {
            handleDeleteCommentButton(comment.comment_id);
          }}
        >
          Delete
        </button>
      ) : null}
    </li>
  );
}
