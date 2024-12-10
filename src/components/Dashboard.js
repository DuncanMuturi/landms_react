import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import IsLoggedIn from "./IsLoggedIn";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { username } = IsLoggedIn();
  const navigate = useNavigate();

  const [lands, setLands] = useState([]); // Empty
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [query, setQuery] = useState("");

  const [phone, setPhone] = useState(null);
  const [success, setSuccess] = useState(null);
  const [failure, setFailure] = useState(null);

  const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem("authToken");
    // Redirect to the sign-in page
    navigate("/signin");
  };

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/api/get_land_details")
      .then(function (response) {
        console.log("Full Response: ", response);
        console.log("Data: ", response.data);
        //Update Hooks - Bookins and Filtered data
        setLands(response.data); // important
        setFilteredData(response.data);
        setLoading(false); //Update Loading to False - Stop Loading
      })
      .catch(function (error) {
        console.log(error);
        setError(error.message);
        setLoading(false); //Update Loading to False - Stop Loading
      }); // end catch
  }, []);
  const imgurl = "http://127.0.0.1:5000/static/images/";

  const handleLiveSearch = (value) => {
    setQuery(value); // query has something as long someone is searching
    const filtered =
      lands &&
      lands.filter(
        (item) =>
          item.land_cost.toLowerCase().includes(value.toLowerCase()) ||
          item.land_location.toLowerCase().includes(value.toLowerCase())
      );
    setFilteredData(filtered);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setFailure(null);
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/mpesa_payment",
        {
          phone,
        }
      );

      if (response.status === 200) {
        setSuccess(true);
        setLoading(false);
        setSuccess(true);

        setPhone("");
      }
    } catch (err) {
      setLoading(false);
      setFailure(err.message);
    }
  };

  return (
    <div className="container-fluid">
      <Navbar username={username} handleLogout={handleLogout} />
      <section className="row">
        <div className="d-flex justify-content-center align-items-center">
          <input
            type="text"
            placeholder="Search a location/price"
            value={query}
            style={{ width: "300px" }}
            onChange={(e) => handleLiveSearch(e.target.value)}
            className="form-control"
          />
        </div>
      </section>

      <section className="row mt-3">
        {loading && <div className="alert alert-warning">Loading ... </div>}
        {error && (
          <div className="text-danger"> Error occurred. Try Later </div>
        )}
        {success && (
          <div className="alert alert-success alert-dismissible fade show mt-3">
            STK Push Initiated Successfuly. Check your phone to complete
            transaction
          </div>
        )}
        {failure && (
          <div className="alert alert-danger alert-dismissible fade show mt-3">
            {failure}
          </div>
        )}

        {filteredData && filteredData.length > 0
          ? filteredData.map((land) => (
              <div className="col-md-3" key={land.id}>
                <div className="card shadow p-2">
                  <img
                    src={imgurl + land.land_photo}
                    alt=""
                    className="w-100 d-block"
                    height="250"
                  />
                  <div className="card-body text-center">
                    <h4 className="ours1">
                      {land.land_location}{" "}
                      <span
                        className="badge bg-danger"
                        style={{ fontSize: "13px" }}
                      >
                        {land.land_size}
                      </span>
                    </h4>
                    <p className="text-muted ours1">{land.land_description}</p>
                    <h5 className="text-warning">KES {land.land_cost}</h5>

                    <br />
                    <button
                      className="btn btn-outline-success"
                      data-bs-toggle="modal"
                      data-bs-target="#mpesaModal"
                    >
                      Buy Now
                    </button>
                    <br />
                  </div>
                </div>
              </div>
            ))
          : !loading && <h3 className="text-center">No lands found</h3>}
      </section>

      <div class="modal" id="mpesaModal" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Mpesa Payment</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">
                    Land Location
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="phone"
                    name="land_location"
                    placeholder="2547XXXXXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  class="btn btn-success mb-3"
                  data-bs-dismiss="modal"
                >
                  Pay Now
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
