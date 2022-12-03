import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../api/axios";
import { Link } from "react-router-dom";

const EDITEMP_URL = "/emp/employee";

const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};

const UpdateEmp = (props) => {
  const location = useLocation();
  const [id, setId] = useState(location.state.data._id);
  const [firstName, setfName] = useState(location.state.data.firstName);
  const [lastName, setlName] = useState(location.state.data.lastName);
  const [email, setEmail] = useState(location.state.data.email);
  const [gender, setGender] = useState(location.state.data.gender);
  const [salary, setSalary] = useState(location.state.data.salary);
  const [error, setError] = useState("");
  const data = {
    firstName,
    lastName,
    email,
    gender,
    salary,
  };

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.put(`${EDITEMP_URL}/${id}`, data, config);
      if (response?.data?.status === true) {
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err?.response?.data?.message);
      console.log(err.response);
    }
  };

  return (
    <div className="container">
      <h1>Update employee</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">Fist Name</label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            placeholder="Enter first name"
            value={firstName}
            onChange={(e) => setfName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            placeholder="Enter last name"
            value={lastName}
            onChange={(e) => setlName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="gender">Gender</label>
          <input
            type="Gender"
            className="form-control"
            id="gender"
            placeholder="Gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="salary">Salary</label>
          <input
            type="text"
            className="form-control"
            id="salary"
            placeholder="Enter salary"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          />
        </div>
        {error && <p className="text-danger">{error}</p>}
        <input
          onSubmit={handleSubmit}
          type="submit"
          className="btn btn-primary"
          name="submit"
        />
        <Link className="btn btn-secondary" to="/dashboard">
          Cancel
        </Link>
      </form>
    </div>
  );
};

export default UpdateEmp;
