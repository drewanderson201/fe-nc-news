import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import ThemeButton from "./ThemeButton";

export default function Header() {
  const { loggedInUser } = useContext(UserContext);
  const location = useLocation();

  return (
    <header className="header-header-bar">
      <Link to="/nav" className="header-nav">
        <div className="header-burger"></div>
        <div className="header-burger"></div>
        <div className="header-burger"></div>
      </Link>

      <Link to="/" className="header-title-link">
        <h1 className="header-title">NC News</h1>
      </Link>

      <Link
        to="/users"
        className="header-user header-user-link"
        state={{ from: location.pathname }}
      >
        <div className="header-user">
          {loggedInUser.username !== undefined ? (
            <>
              <img
                className="header-avatar-img"
                alt={`Avatar of logged in user`}
                src={loggedInUser.avatar_url}
              />
              <p className="user-avatar-username">{loggedInUser.username}</p>
            </>
          ) : (
            <p>Log In</p>
          )}
        </div>
      </Link>
      <ThemeButton />
    </header>
  );
}
