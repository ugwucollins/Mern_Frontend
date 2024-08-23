import axios from "axios";

// const Url = "https://mern-project-422f.vercel.app/api";

const Api = axios.create({
  baseURL: "https://mern-project-422f.vercel.app/api",
});

export default Api;
