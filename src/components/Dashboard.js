import { useEffect, useState } from "react";
import axios from "../api/axios";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const EMPLOYEES_URL = "/emp/employees";
const EMPLOYEE_URL = "/emp/employee";

const config = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [err, setErr] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const getData = async () => {
    try {
      const response = await axios.get(EMPLOYEES_URL, config);
      if (response?.data?.status === true) {
        setEmployees(response?.data?.data);
      } else {
        alert("Something went wrong");
        navigate("/login");
      }
    } catch (err) {
      setErr(err);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (token) {
      const user = jwt_decode(token);
      if (!user) {
        alert("Please login to continue ***");
        navigate("/login");
      } else {
        getData();
      }
    } else {
      alert("Please login to continue");
      setErr("Please login to continue ***");
      navigate("/login");
    }
  }, []);

  const deleteEmp = async (id) => {
    try {
      await axios.delete(`${EMPLOYEE_URL}/${id}`, config);
      getData();
    } catch (err) {
      console.log(err);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    alert("Logged out successfully");
    navigate("/login");
  };

  return (
    <div className="container">
      <h1>Employees</h1>
      {err && <h3>{err}</h3>}
      <Link className="btn btn-primary" to="/add">
        Add Employee
      </Link>
      <button className="btn btn-secondary" onClick={logout}>
        Logout
      </button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Salary</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr key={employee._id}>
              <td>{index + 1}</td>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.email}</td>
              <td>{employee.gender}</td>
              <td>{employee.salary}</td>
              <td>
                <Link
                  className="btn btn-primary"
                  to={`/edit/${employee._id}`}
                  state={{ data: employee }}
                >
                  Update
                </Link>
                <Link to={employee._id} className="btn btn-danger">
                  View
                </Link>
                <Link
                  onClick={() => deleteEmp(employee._id)}
                  className="btn btn-secondary"
                >
                  Delete
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Dashboard;
