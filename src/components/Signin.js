import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signin = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [loading, setLoading] = useState(false);
  const [failure, setFailure] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFailure(null);
    try {
      const response = await axios.post("http://127.0.0.1:5000/api/signin", {
        email,
        password,
      });

      if (response.status === 200 && response.data.user) {
        localStorage.setItem("user_id", response.data.user.id);
        localStorage.setItem("username", response.data.user.username);
        navigate("/");
      }
    } catch (err) {
      setLoading(false);
      setFailure(err.message);
    }
  };
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg" style={{ width: "400px" }}>
        <div className="card-body">
          <h4 className="card-title text-center mb-4">Signin </h4>

          {failure && <div className="alert alert-danger mt-3">{failure}</div>}
          {loading && (
            <div className="alert alert-warning mt-3"> Please Wait..</div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Signin
            </button>
          </form>
          <Link to="/signup" className="mt-3">
            Dont have an Account, Signup
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signin;
