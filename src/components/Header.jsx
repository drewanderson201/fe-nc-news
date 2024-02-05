import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="header-header-bar">
      <Link to="/nav">
        <button>Nav</button>
      </Link>
      <Link to="/" className="link-header-title">
        <h1 className="header-title">NC News</h1>
      </Link>
    </header>
  );
}
