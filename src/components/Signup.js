import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [password, setPassword] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [failure, setFailure] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setFailure(null);
    try {
      const response = await axios.post("http://127.0.0.1:5000/api/signup", {
        username,
        email,
        phone,
        password,
      });

      if (response.status === 200) {
        setSuccess(true);
        setLoading(false);
        setSuccess(response.data.success);

        setEmail("");
        setUsername("");
        setPassword("");
        setPhone("");
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
          <h4 className="card-title text-center mb-4">Signup</h4>

          {success && (
            <div className="alert alert-success mt-3">Signup successful!</div>
          )}
          {failure && <div className="alert alert-danger mt-3">{failure}</div>}
          {loading && (
            <div className="alert alert-warning mt-3"> Please Wait..</div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
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
              <label htmlFor="phone" className="form-label">
                Phone
              </label>
              <input
                type="text"
                className="form-control"
                id="phone"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
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
              Signup
            </button>
          </form>
          <Link to="/signin" className="mt-3">
            Already have an Account, Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
