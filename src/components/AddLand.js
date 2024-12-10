import axios from "axios";
import { useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const AddLand = () => {
  const [land_description, setLandDescription] = useState(null);
  const [land_location, setLandLocation] = useState(null);
  const [land_cost, setLandCost] = useState(null);
  const [land_size, setLandSize] = useState(null);
  const [land_owner, setLandOwner] = useState(null);
  const [plot_no, setPlotNo] = useState(null);
  const [land_photo, setLandPhoto] = useState(null);
  const [success, setSuccess] = useState(null);
  const [failure, setFailure] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setFailure(null);
    try {
      const formData = new FormData();
      formData.append("land_description", land_description);
      formData.append("land_location", land_location);
      formData.append("land_cost", land_cost);
      formData.append("land_size", land_size);
      formData.append("land_owner", land_owner);
      formData.append("plot_no", plot_no);
      formData.append("land_photo", land_photo);
      const response = await axios.post(
        "http://127.0.0.1:5000/api/add_land",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        setSuccess(true);
        setLoading(false);
        setSuccess(response.data.success);
        navigate("/");

        setLandDescription("");
        setLandLocation("");
        setLandCost("");
        setLandSize("");
        setLandOwner("");
        setPlotNo("");
      }
    } catch (err) {
      setLoading(false);
      setFailure(err.message);
    }
  };

  return (
    <div className="container-fluid">
      <Navbar />
      <br />
      <br />
      <section className="row">
        <div className="d-flex justify-content-center align-items-center vh-100">
          <div className="card shadow-lg" style={{ width: "500px" }}>
            <div className="card-body  p-5">
              <h4 className="card-title text-center mb-4">Add New Land</h4>

              {success && (
                <div className="alert alert-success alert-dismissible fade show mt-3">
                  Added successful!
                </div>
              )}
              {failure && (
                <div className="alert alert-danger alert-dismissible fade show mt-3">
                  {failure}
                </div>
              )}
              {loading && (
                <div className="alert alert-warning alert-dismissible fade show mt-3">
                  {" "}
                  Please Wait..
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="land_location" className="form-label">
                    Land Location
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="land_location"
                    name="land_location"
                    value={land_location}
                    onChange={(e) => setLandLocation(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="land_cost" className="form-label">
                    Land Cost
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="land_cost"
                    name="land_cost"
                    value={land_cost}
                    onChange={(e) => setLandCost(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="land_size" className="form-label">
                    Land Size
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="land_size"
                    name="land_size"
                    value={land_size}
                    onChange={(e) => setLandSize(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="land_size" className="form-label">
                    Land Owner
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="land_size"
                    name="land_size"
                    value={land_owner}
                    onChange={(e) => setLandOwner(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="land_size" className="form-label">
                    Plot No
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="land_size"
                    name="land_size"
                    value={plot_no}
                    onChange={(e) => setPlotNo(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="land_description" className="form-label">
                    Land Description
                  </label>
                  <textarea
                    type="text"
                    className="form-control"
                    rows="3"
                    id="land_description"
                    name="land_description"
                    value={land_description}
                    onChange={(e) => setLandDescription(e.target.value)}
                    required
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="land_photo" className="form-label">
                    Land Photo
                  </label>
                  <input
                    type="file"
                    id="land_photo"
                    className="form-control"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setLandPhoto(file);
                      }
                    }}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Add Land
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AddLand;
