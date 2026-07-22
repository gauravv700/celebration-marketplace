import { updateBookingStatus } from "../../services/vendorService";
import toast from "react-hot-toast";

const BookingCard = ({ booking, reload }) => {
  const handleStatusChange = async (e) => {
    const status = e.target.value;

    try {
      await updateBookingStatus(booking.id, status);

      toast.success("Booking status updated");

      reload();
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to update booking");
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow">
      <img
        src={booking.service?.image_url || "https://placehold.co/600x350"}
        alt={booking.service?.title}
        className="h-56 w-full object-cover"
      />

      <div className="space-y-3 p-5">
        <span className="rounded bg-indigo-100 px-3 py-1 text-sm">
          {booking.service?.category}
        </span>

        <h2 className="text-2xl font-bold">{booking.service?.title}</h2>

        <hr />

        <p>
          <strong>Customer :</strong>

          {booking.customer?.full_name}
        </p>

        <p>
          <strong>Email :</strong>

          {booking.customer?.email}
        </p>

        <p>
          <strong>Phone :</strong>

          {booking.customer?.phone}
        </p>

        <p>
          <strong>Date :</strong>

          {booking.booking_date}
        </p>

        <p>
          <strong>Guests :</strong>

          {booking.guest_count}
        </p>

        <p>
          <strong>Total :</strong>₹{booking.total_price}
        </p>

        {booking.special_request && (
          <p>
            <strong>Special Request :</strong>

            {booking.special_request}
          </p>
        )}

        <div>
          <label className="mb-2 block font-semibold">
            Booking Status:
            <span className={`rounded px-3 mx-2 py-1 text-white
                    ${
                      booking.status === "Pending"
                        ? "bg-yellow-500"
                        : booking.status === "Confirmed"
                          ? "bg-green-600"
                          : booking.status === "Completed"
                            ? "bg-blue-600"
                            : "bg-red-500"
                    }`}
            >
              {booking.status}
            </span>
          </label>

          <select
            value={booking.status}
            onChange={handleStatusChange}
            className="w-full rounded border p-3"
          >
            <option value="Pending">Pending</option>

            <option value="Confirmed">Confirmed</option>

            <option value="Completed">Completed</option>

            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
