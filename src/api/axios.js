import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:3001/api",
  // baseURL: "https://fullstack-app-101347350.herokuapp.com/api",
});
