const supabase = require("../config/supabase");
const { triggerBookingAutomation } = require("./automationService");
// const AppError = require("../utils/AppError")

const createBookingRecord = async ({
  customerId,
  serviceId,
  bookingDate,
  guestCount,
  specialRequest,
}) => {
  console.log("request coming")
  // Fetch Service
  const { data: service, error: serviceError } = await supabase
    .from("services")
    .select("*")
    .eq("id", serviceId)
    .single();
  if (!service || serviceError) {
    throw new Error("Service not found");
  }
  console.log(service, serviceError)

  // Fetch Customer
  const { data: customer, error: customerError } = await supabase
    .from("users")
    .select("full_name,email")
    .eq("id", customerId)
    .single();
  if (customerError) {
    throw new Error("Customer not found");
  }
  console.log(customer, customerError)

  // Fetch Vendor
  const { data: vendor, error: vendorError } = await supabase
    .from("vendors")
    .select("business_name,user_id")
    .eq("id", service.vendor_id)
    .single();
  if (vendorError || !vendor) {
    throw new Error(vendorError?.message || "Vendor not found for this service");
  }
  console.log(vendor, vendorError)

  // Fetch Vendor email from user table
  const { data: vendorUser } = await supabase
    .from("users")
    .select("email")
    .eq("id", vendor.user_id)
    .single();

  const vendorId = service.vendor_id;
  const totalPrice = service.price;

  const { data, error } = await supabase
    .from("bookings")
    .insert({
      customer_id: customerId,
      vendor_id: vendorId,
      service_id: serviceId,
      booking_date: bookingDate,
      guest_count: guestCount,
      special_request: specialRequest,
      total_price: totalPrice,
      status: "Pending",
    })
    .select()
    .single();
  if (error) {
    throw new Error(error.message);
  }
  const booking = data;

  await triggerBookingAutomation({
    bookingId: booking.id,
    customerName: customer.full_name,
    customerEmail: customer.email,
    vendorName: vendor.business_name,
    vendorEmail: vendorUser.email,
    serviceTitle: service.title,
    bookingDate: booking.booking_date,
    guestCount: booking.guest_count,
    totalPrice: booking.total_price,
    status: booking.status,
  });

  return { ...booking, service };
};

const getBookingRecord = async ({ customerId }) => {
  const { data: bookings, error: bookingsError } = await supabase
    .from("bookings")
    .select(
      `
      *,
      service:services (
        id,
        title,
        category,
        image_url
      )
    `,
    )
    .eq("customer_id", customerId);
  if (bookingsError) {
    throw new Error("Failed to Load Booking");
  }
  return bookings;
};

const updateBookingStatusRecord = async (
  bookingId,
  status,
  userId
) => {

  const { data: existingVendor, error: existingVendorError } = await supabase
    .from("vendors")
    .select("id")
    .eq("user_id", userId)
    .single();

  if (existingVendorError) {
    throw new Error("Vendor Profile Not Found")
  }

  const vendorId = existingVendor.id

  const { data: booking } = await supabase
    .from("bookings")
    .select("*")
    .eq("id", bookingId)
    .single();

  if (!booking) {
    throw new Error("Booking not found", 404);
  }

  if (booking.vendor_id !== vendorId) {
    throw new Error("Unauthorized", 403);
  }

  const { data, error } = await supabase
    .from("bookings")
    .update({
      status: status
    })
    .eq("id", bookingId)
    .select()
    .single();
  if (error) throw error;

  return data;
};

module.exports = { createBookingRecord, getBookingRecord, updateBookingStatusRecord };
