import axios from "axios";

const AxiosInstance = axios.create({
    baseURL: "https://localhost:7250/api",
    headers: {
        "Content-Type": "application/json",
    },
});

export default AxiosInstance;