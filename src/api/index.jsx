import axios from "axios";

const Api = axios.create({
    baseURL: "http://apibarang.test/api",
    headers: {
        "Content-Type": "application/json",
    },
});

export default Api;