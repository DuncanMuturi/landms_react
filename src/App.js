import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Dashboard from "./components/Dashboard";
import AddLand from "./components/AddLand";

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/signin" element={<Signin />}></Route>
          <Route path="/" element={<Dashboard />}></Route>
          <Route path="/addland" element={<AddLand />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
