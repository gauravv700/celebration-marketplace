import api from "../api/axios";

export const getAllServices = async () => {
    const response = await api.get("/services");
    return response.data;
};

export const getServiceById = async (id) => {
    const response = await api.get(`/services/${id}`);
    return response.data;
};

export const createService = async (formData) => {
    const response = await api.post("/services", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return response.data;
};

export const updateService = async (id, formData) => {
    const response = await api.put(`/services/${id}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return response.data;
};

export const deleteService = async (id) => {
    const response = await api.delete(`/services/${id}`);
    return response.data;
};
