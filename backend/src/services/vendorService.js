const supabase = require("../config/supabase");

const createVendorProfile = async ({
  userId,
  businessName,
  description,
  city,
  address,
  phone,
}) => {
  // database logic here
  const { data: existingVendor } = await supabase
    .from("vendors")
    .select("id")
    .eq("user_id", userId)
    .single();

  if (existingVendor) {
    throw new Error("Vendor profile already exists");
  }

  const { data, error } = await supabase
    .from("vendors")
    .insert({
      user_id: userId,
      business_name: businessName,
      description,
      city,
      address,
      phone,
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

const getVendorProfile = async (userId) => {
  const { data, error } = await supabase
    .from("vendors")
    .select("id, business_name, description, city, address, phone")
    .eq("user_id", userId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
const getVendorServicesRecord = async (userId) => {
  console.log("Vendor", userId)
  const { data: existingVendor } = await supabase
    .from("vendors")
    .select("id")
    .eq("user_id", userId)
    .single();
  console.log(existingVendor)
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("vendor_id", existingVendor.id)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
};

const getVendorBookingsRecord = async (userId) => {
  const { data: existingVendor } = await supabase
    .from("vendors")
    .select("id")
    .eq("user_id", userId)
    .single();
  const { data, error } = await supabase
    .from("bookings")
    .select(
      `
            *,
            service:services(
                title,
                category,
                image_url
            ),
            customer:users(
                full_name,
                email,
                phone
            )
        `,
    )
    .eq("vendor_id", existingVendor.id)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
};
module.exports = {
  createVendorProfile,
  getVendorProfile,
  getVendorServicesRecord,
  getVendorBookingsRecord
};
