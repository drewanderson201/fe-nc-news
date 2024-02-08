import { useState } from "react";
import { postComment } from "../utils/api";
import Error from "./Error";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";


export default function CommentForm({ article_id, setCommentsData }) {
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);
  const [userCommentInput, setUserCommentInput] = useState("");
  const { loggedInUser } = useContext(UserContext);
  const [commentPosted, setCommentPosted] = useState(false);

  if (isError) return <Error error={error} />;

  const handleUserCommentChange = (event) => {
    setUserCommentInput(event.target.value);
  };

  const handleCommentPost = (event) => {
    event.preventDefault();

    const newCommentRequestBody = {
      username: loggedInUser.username,
      body: userCommentInput,
    };

    const dateTimeNow = new Date();
    const tempCommentID = `${loggedInUser.username}-${dateTimeNow}`;

    postComment(article_id, newCommentRequestBody).then(({ comment }) => {
        setError(false);
        const newCommentID = comment.comment_id;
        setCommentsData((currentComments) => {
          const updatedComments = [...currentComments];
          const tempCommentIndex = updatedComments.findIndex(
            (comment) => comment.comment_id === tempCommentID
          );
          updatedComments[tempCommentIndex].comment_id = newCommentID;
          return updatedComments;
        });
      }).catch((error) => {
        const errMsg = error.response.data.msg;
        setIsError(true);
        setError(errMsg);
        setCommentPosted(false);
      });

    const tempComment = {
      comment_id: tempCommentID,
      body: userCommentInput,
      article_id: article_id,
      author: loggedInUser.username,
      votes: 0,
      created_at: dateTimeNow,
    };

    setCommentsData((currentComments) => {
      return [tempComment, ...currentComments];
    });
    setCommentPosted(true);
    setUserCommentInput("");
  };

  return (
    <div>
      <h3>Comments</h3>
      <p>You're signed in as {loggedInUser.username}</p>
      <form onSubmit={handleCommentPost}>
        <label htmlFor="comment-input">Add your comment...</label>
        <textarea
          id="comment-input"
          type="textarea"
          value={userCommentInput}
          onChange={handleUserCommentChange}
          maxLength="100"
          required
        ></textarea>
        <button type="submit" className="comment-button">
          Post
        </button>
      </form>
      {commentPosted ? (
        <p className="success-msg">Thanks for your comment!</p>
      ) : null}
    </div>
  );
}
