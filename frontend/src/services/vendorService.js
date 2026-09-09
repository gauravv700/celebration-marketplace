import api from "../api/axios";

export const getVendorProfile = async () => {
  const response = await api.get("/vendor/profile");
  return response.data;
};

export const getVendorServices = async () => {
  const response = await api.get("/vendor/services");
  return response.data;
};

export const getVendorBookings = async () => {
  const response = await api.get("/vendor/bookings");

  return response.data;
};

export const updateBookingStatus = async (id, status) => {
  const response = await api.patch(`/bookings/${id}/status`, { status });

  return response.data;
};
