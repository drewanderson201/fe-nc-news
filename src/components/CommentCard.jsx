
export default function CommentCard({ comment }) {

      const formattedDate = new Date(comment.created_at).toDateString();
      const formattedTime = (new Date(comment.created_at).toTimeString()).slice(0,9);


  return (
    <li className="comments-comment">
      <p className="comment-author">{comment.author}</p>
      <p className="comment-created">
        {formattedDate} {formattedTime}
      </p>
      <p className="comment-body">{comment.body}</p>
      <p className="comment-votes">Votes: {comment.votes}</p>
    </li>
  );
}
