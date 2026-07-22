const supabase = require("../config/supabase");

/**
 * Find vendor profile from logged in user
 */
const getVendorByUserId = async (userId) => {
    const { data: vendor, error } = await supabase
        .from("vendors")
        .select("id")
        .eq("user_id", userId)
        .single();
    if (error || !vendor) {
        throw new Error("Vendor profile not found");
    }

    return vendor;
};

/**
 * Create Service
 */
exports.createServiceRecord = async ({
    userId,
    title,
    category,
    description,
    price,
    capacity,
    image_url
}) => {

    const vendor = await getVendorByUserId(userId);

    const { data, error } = await supabase
        .from("services")
        .insert({
            vendor_id: vendor.id,
            title,
            category,
            description,
            price,
            capacity,
            image_url
        })
        .select()
        .single();

    if (error) {
        throw new Error(error.message);
    }

    return data;
};

/**
 * Get All Services
 */
exports.getAllServicesRecord = async (page, limit) => {

    const from = (page - 1) * limit;
    const to = from + limit - 1;
    const { data, error } = await supabase
        .from("services")
        .select(`
            *,
            vendors (
                business_name,
                city,
                phone
            )
        `)
        .range(from, to);
    return data
    if (error) {
        throw new Error(error.message);
    }

    // Use for filter and advancer searching
    // const { category,
    //     city, minPrice,
    //     maxPrice,
    //     search,
    //     page = 1,
    //     limit = 10,
    //     sortBy = "created_at",
    //     order = "desc"
    // } = query;

    // let db = supabase
    //     .from("services")
    //     .select(`
    // *,
    // vendors(
    //     business_name,
    //     city
    // )
    // `);

    // if (category) {
    //     db = db.eq("category", category);
    // }
    // if (minPrice) {
    //     db = db.gte("price", Number(minPrice));
    // }
    // if (maxPrice) {
    //     db = db.lte("price", Number(maxPrice));
    // }
    // if (search) {
    //     db = db.ilike(
    //         "title",
    //         `%${search}%`
    //     );
    // }
    // db = db.order(
    //     sortBy,
    //     {
    //         ascending: order === "asc"
    //     }
    // );
    // const from = (page - 1) * limit;
    // db = db.range(
    //     from,
    //     from + Number(limit) - 1
    // );
    // const { data, error } = await db;

    return data;
};

/**
 * Get Single Service
 */
exports.getServiceRecord = async (serviceId) => {

    const { data, error } = await supabase
        .from("services")
        .select(`
            *,
            vendors (
                business_name,
                city,
                address,
                phone,
                description
            )
        `)
        .eq("id", serviceId)
        .single();

    if (error || !data) {
        throw new Error("Service not found");
    }

    return data;
};

/**
 * Update Service
 */
exports.updateServiceRecord = async ({
    serviceId,
    userId,
    updates,
}) => {
    const vendor = await getVendorByUserId(userId);

    const { data: service, error: serviceError } = await supabase
        .from("services")
        .select("*")
        .eq("id", serviceId)
        .single();

    if (serviceError || !service) {
        throw new Error("Service not found");
    }

    if (service.vendor_id !== vendor.id) {
        throw new Error("You are not authorized to update this service");
    }

    const { data, error } = await supabase
        .from("services")
        .update(updates)
        .eq("id", serviceId)
        .select()
        .single();

    if (error) {
        throw new Error(error.message);
    }

    return data;
};

/**
 * Delete Service
 */
exports.deleteServiceRecord = async (
    serviceId,
    userId
) => {

    const vendor = await getVendorByUserId(userId);

    const { data: service, error: serviceError } = await supabase
        .from("services")
        .select("*")
        .eq("id", serviceId)
        .single();

    if (serviceError || !service) {
        throw new Error("Service not found");
    }

    if (service.vendor_id !== vendor.id) {
        throw new Error("You are not authorized to delete this service");
    }

    const { error } = await supabase
        .from("services")
        .delete()
        .eq("id", serviceId);

    if (error) {
        throw new Error(error.message);
    }

    return true;
};