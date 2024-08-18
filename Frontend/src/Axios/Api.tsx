import axios from "axios";

const Url = import.meta.env.VITE_PORT_URL;

const Api = axios.create({
  baseURL: `${Url}`,
});

export default Api;
