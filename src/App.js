import Signup from "./components/Signup";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import { Routes, Route } from "react-router-dom";
import AddEmp from "./components/AddEmp";
import EmpDetail from "./components/EmpDetail";
import PageNotFound from "./components/PageNotFount";
import UpdateEmp from "./components/UpdateEmp";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add" element={<AddEmp />} />
        <Route path="/edit/:id" element={<UpdateEmp />} />
        <Route path="/dashboard/:id" element={<EmpDetail />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
