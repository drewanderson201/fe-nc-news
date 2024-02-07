import { Link } from "react-router-dom";
import { useContext } from "react";
import {UserContext} from "../contexts/UserContext";

export default function Header() {
  const {loggedInUser} = useContext(UserContext)
  return (
    <header className="header-header-bar">

      <Link to="/nav" className="header-nav">
        <button>Nav</button>
      </Link>

      <Link to="/" className="header-title-link">
        <h1 className="header-title">NC News</h1>
      </Link>

      <div className="header-user">
        {/* <p className="user-avatar-username">{loggedInUser.username}</p> */}
        <img
          className="user-avatar-img"
          alt={`Avatar of logged in user`}
          src={loggedInUser.avatar_url}
        />
      </div>
    </header>
  );
}
