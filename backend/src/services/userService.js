const supabase = require("../config/supabase");
const AppError = require("../utils/AppError");

const getUserById = async (id) => {

    const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", id)
        .single();

    if (error || !data) {
        throw new AppError("User not found", 404);
    }

    return data;
};

module.exports = {
    getUserById
};