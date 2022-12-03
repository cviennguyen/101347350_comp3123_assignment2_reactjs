import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { Link } from "react-router-dom";

const ADDEMP_URL = "/emp/employees";

const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};

const AddEmp = () => {
  const [firstName, setfName] = useState("");
  const [lastName, setlName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [salary, setSalary] = useState("");
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
      const response = await axios.post(ADDEMP_URL, data, config);
      if (response?.data?.status === true) {
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err?.response?.data?.message);
      console.log(err.response);
    }
  };

  return (
    <div className="container form">
      <h1>Add Employee</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group input">
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
        <div className="form-group input">
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
        <div className="form-group input">
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
        <div className="form-group input">
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
        <div className="form-group input">
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
        <Link className="btn btn-secondary mx-3" to="/dashboard">
          Cancel
        </Link>
      </form>
    </div>
  );
};

export default AddEmp;
