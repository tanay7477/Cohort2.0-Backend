import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true
});

export async function register(username, email, password) {
    try {
        const response = await api.post("/api/auth/register", {
            username,
            email,
            password
        });

        console.log("REGISTER API RESPONSE:", response.data);

        return response.data;

    } catch (err) {
        console.error(
            "REGISTER ERROR:",
            err.response?.data || err.message
        );

        throw err;
    }
}

export async function login(username, password) {
    try {
        const response = await api.post("/api/auth/login", {
            username,
            password
        });

        console.log("LOGIN API RESPONSE:", response.data);

        return response.data;

    } catch (err) {
        console.error(
            "LOGIN ERROR:",
            err.response?.data || err.message
        );

        throw err;
    }
}