import { Link } from "react-router-dom";
import { useAuth } from "./Authentication";

function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  return (
    <nav className="navbar navbar-light bg-light">
      <a className="navbar-brand" href="#">
        COMPANY
      </a>
      <Link className="navbar-brand" to="/public">
        Public
      </Link>
      {!user ? (
        <Link className="navbar-brand" to="/login">
          Login
        </Link>
      ) : (
        <>
          <Link to="/dashboard">dashboard</Link>
          <Link to="/logout">Logout</Link>
          <Link to="/dashboard/profile">profile</Link>
        </>
      )}
    </nav>
  );
}

export default Header;
