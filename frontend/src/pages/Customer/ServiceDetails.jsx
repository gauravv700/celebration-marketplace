import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getServiceById } from "../../services/serviceService";
import BookingCard from "@/components/BookingCard/BookingCard";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { createBooking } from "../../services/bookingService";

const ServiceDetails = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const bookingSchema = z.object({
    bookingDate: z.string().min(1, "Booking date is required"),
    guestCount: z.coerce.number().min(1, "Guest count must be at least 1"),
    specialRequest: z.string().optional(),
  });

  const onSubmit = async (formData) => {
    try {
      const response = await createBooking({
        serviceId: id,

        ...formData,
      });

      toast.success(response.message);

      navigate("/my-bookings");
    } catch (error) {
      toast.error(error.response?.data?.message || "Booking Failed");
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(bookingSchema),
  });

  useEffect(() => {
    loadService();
  }, []);

  const loadService = async () => {
    try {
      const response = await getServiceById(id);

      if (response.success) {
        setService(response.service);
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h2 className="text-center py-20">Loading...</h2>;
  }

  return (
    <>
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid gap-10 lg:grid-cols-2">
          <img
            src={service.image_url || "https://placehold.co/800x600"}
            className="rounded-xl"
          />

          <div>
            <span className="rounded bg-indigo-100 px-3 py-1">
              {service.category}
            </span>

            <h1 className="mt-4 text-4xl font-bold">{service.title}</h1>

            <p className="mt-6">{service.description}</p>

            <h2 className="mt-6 text-3xl font-bold text-indigo-600">
              ₹{service.price}
            </h2>

            <p className="mt-3">Capacity : {service.capacity} Guests</p>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-10 rounded-xl border p-6 shadow space-y-5"
            >
              <h2 className="text-2xl font-bold">Book This Service</h2>

              <div>
                <label>Booking Date</label>

                <input
                  type="date"
                  {...register("bookingDate")}
                  className="mt-1 w-full rounded border p-3"
                />

                <p className="text-red-500">{errors.bookingDate?.message}</p>
              </div>

              <div>
                <label>Guests</label>

                <input
                  type="number"
                  {...register("guestCount")}
                  className="mt-1 w-full rounded border p-3"
                />

                <p className="text-red-500">{errors.guestCount?.message}</p>
              </div>

              <div>
                <label>Special Request</label>

                <textarea
                  rows="4"
                  {...register("specialRequest")}
                  className="mt-1 w-full rounded border p-3"
                />
              </div>

              <button
                disabled={isSubmitting}
                className="w-full rounded-lg bg-indigo-600 py-3 text-white"
              >
                {isSubmitting ? "Creating Booking..." : "Book Now"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceDetails;
