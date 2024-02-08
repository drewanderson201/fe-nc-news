import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";



export default function UserCard({ user, from }) {

  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
 const navigate = useNavigate();



  const handleClick = (user) => {
    setLoggedInUser(user)
    if(/^\/articles\/\d+$/.test(from)){
        navigate(from)
    }
  };

  return (
    <>
      <div className="user-card">
        <button
          className={
            loggedInUser.username === user.username
              ? "user-button user-current"
              : "user-button"
          }
          onClick={() => {
            handleClick(user);
          }}
        >
          <div className="user-details">
            <h2 className="user-name">{user.name}</h2>
            <p className="user-username">Username: {user.username}</p>
          </div>
          <img
            src={user.avatar_url}
            alt={`User Image for ${user.username}`}
            className="user-avatar-img"
          />
        </button>
      </div>
      <hr />
    </>
  );
}
