import api from "../api/axios";

export const createBooking = async (data) => {
    const response = await api.post(
        "/bookings",
        data,
    );
    return response.data;
};

export const getMyBookings = async () => {
    const response = await api.get("/bookings");
    return response.data;
};
