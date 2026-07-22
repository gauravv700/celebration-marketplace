const supabase = require("../config/supabase");

exports.protect = async (req, res, next) => {

    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "Authorization header missing"
            });
        }

        if (!authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Invalid Authorization format"
            });
        }

        const token = authHeader.split(" ")[1];

        const { data, error } = await supabase.auth.getUser(token);
        if (error) {
            return res.status(401).json({
                success: false,
                message: "Invalid or expired token"
            });
        }
        const { data: profile, error: profileError } = await supabase
            .from("users")
            .select("*")
            .eq("id", data.user.id)
            .single();

        if (profileError) {
            return res.status(401).json({
                success: false,
                message: "Unable to fetch User"
            });
        }
        req.user = profile;
        next();
    }

    catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};