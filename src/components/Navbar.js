import { Link } from "react-router-dom";

const Navbar = ({ username, handleLogout }) => {
  return (
    <div className="col-md-12">
      <div className="navbar navbar-expand-md">
        <Link href="/" className="navbar-brand">
          LandMs
        </Link>
        <button
          className="navbar-toggler"
          data-bs-target="myNav"
          data-bs-collapse="collapse"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="myNav">
          <div className="navbar-nav">
            <Link className="nav-link" to="/">
              Home
            </Link>
            <Link className="nav-link" to="/addland">
              Add Land
            </Link>
          </div>
          <div className="navbar-nav ms-auto">
            <Link className="nav-link text-dark">
              Welcome: <strong className="text-warning">{username}</strong>
            </Link>
            <button onClick={handleLogout} className="nav-link">
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
