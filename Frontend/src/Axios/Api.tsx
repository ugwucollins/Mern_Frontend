import axios from "axios";

// const Url = import.meta.env.VITE_PORT_URL;

const Api = axios.create({
  baseURL: `${import.meta.env.VITE_PORT_URL}`,
  // baseURL: `${Url}`,
});
console.log(`${import.meta.env.VITE_PORT_URL}`);

export default Api;
