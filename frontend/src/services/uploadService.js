import api from "../api/axios";

export const uploadImage = async (file) => {
    const formData = new FormData();

    formData.append("image", file);

    const response = await api.post(
        "/uploads/service",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        },
    );

    return response.data;
};
