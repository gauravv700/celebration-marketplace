const supabase = require("../config/supabase");

// Signup logic goes here
const signupUser = async ({
    fullName,
    email,
    password,
    phone,
    role
}) => {
    // Validation will go here
    if (!fullName || !email || !password || !role) {
        throw new Error("All required fields are mandatory")
    }

    const allowedRoles = ["customer", "vendor"];

    if (!allowedRoles.includes(role)) {
        throw new Error("Invalid Role")
    }

    const { data, error } = await supabase.auth.signUp({
        email,
        password
    });

    if (error) {
        throw new Error(error.message)
    }

    const user = data.user;
    const { error: profileError } = await supabase.from("users").insert({
        id: user.id,
        email: email,
        full_name: fullName,
        phone,
        role
    });
    if (profileError) {
        throw new Error(profileError.message);
    } else {
        return {
            id: user.id,
            email: user.email
        };
    }
};

const loginUser = async ({ email, password }) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if (error) {
        throw new Error(error.message)
    }

    const authUser = data.user;
    const { data: profile, error: profileError } =
        await supabase
            .from("users")
            .select("id, full_name, email, phone, role")
            .eq("id", authUser.id)
            .single();
    if (profileError) {
        throw new Error("User Profile Not Found")
    }
    return {
        accessToken: data.session.access_token,
        refreshToken: data.session.refresh_token,
        expiresIn: data.session.expires_in,
        user: profile
    };
};

module.exports = {
    signupUser, loginUser
};