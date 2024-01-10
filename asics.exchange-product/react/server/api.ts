import axios from "axios";

const api = axios.create({
    baseURL: "/_v/app"
});

export default api;