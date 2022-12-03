import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "../api/axios";
import "bootstrap/dist/css/bootstrap.min.css";

const config = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};

export default function EmpDetail() {
  const { id } = useParams();
  console.log(id);
  const [employee, setEmployee] = useState([]);
  const EMPLOYEE_URL = "/emp/employee";
  const getData = async () => {
    try {
      const response = await axios.get(`${EMPLOYEE_URL}/${id}`, config);
      if (response?.data?.status === true) {
        setEmployee(response?.data?.data);
      }
    } catch (err) {
      alert("Please login to continue");
      console.log(err);
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwt_decode(token);
      if (!user) {
        window.location("/login");
      } else {
        getData();
      }
    }
  }, []);
  return (
    <div className="container">
      <h1>Employee detail</h1>
      <div className="card" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title">
            {employee.firstName} {employee.lastName}
          </h5>
          <h6 className="card-subtitle mb-2 text-muted">{employee.email}</h6>
          <h6 className="card-subtitle mb-2 text-muted">{employee.gender}</h6>
          <h6 className="card-subtitle mb-2 text-muted">{employee.salary}</h6>
          <Link className="btn btn-primary" to="/dashboard">
            Back
          </Link>
        </div>
      </div>
    </div>
  );
}
