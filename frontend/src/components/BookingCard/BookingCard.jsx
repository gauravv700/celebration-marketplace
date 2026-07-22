const BookingCard = ({ booking }) => {
  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow">
      <img
        src={booking.service.image_url || "https://placehold.co/600x300"}
        className="h-52 w-full object-cover"
      />

      <div className="space-y-3 p-5">
        <span className="rounded bg-indigo-100 px-3 py-1 text-sm">
          {booking.service.category}
        </span>

        <h2 className="text-2xl font-bold">{booking.service.title}</h2>

        <p>Booking Date :{booking.booking_date}</p>

        <p>Guests :{booking.guest_count}</p>

        <p>₹{booking.total_price}</p>

        <span
          className={`rounded px-3 py-1 text-white

                    ${booking.status === "Pending"
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
      </div>
    </div>
  );
};

export default BookingCard;
