import { useEffect, useState } from "react";
import BookingCard from "../../components/vendor/BookingCard";
import { getVendorBookings } from "../../services/vendorService";

const VendorBookings = () => {
  const [bookings, setBookings] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await getVendorBookings();
      console.log(response)
      setBookings(response.bookings);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">Vendor Bookings</h1>

      {bookings.length === 0 ? (
        <div className="rounded-lg border p-8 text-center">
          No Bookings Found
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          {bookings.map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              reload={fetchBookings}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default VendorBookings;
