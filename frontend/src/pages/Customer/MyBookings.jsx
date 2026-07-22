import { useEffect, useState } from "react";
import { getMyBookings } from "../../services/bookingService";
import BookingCard from "../../components/BookingCard/BookingCard";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await getMyBookings();
      setBookings(response.bookings);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="py-20 text-center">Loading...</div>;
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="mb-10 text-4xl font-bold">My Bookings</h1>
      {bookings.length === 0 ? (
        <div className="rounded-xl border p-10 text-center">
          No Bookings Yet
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {bookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
