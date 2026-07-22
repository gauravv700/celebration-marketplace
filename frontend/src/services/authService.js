import api from "../api/axios";

export const signup = (data) => {
    return api.post("/auth/signup", data);
};

export const login = (data) => {
    return api.post("/auth/login", data);
};