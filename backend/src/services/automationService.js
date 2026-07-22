const axios = require("axios");

const triggerBookingAutomation = async (payload) => {

    try {
        await axios.post(
            process.env.GOOGLE_SCRIPT_URL,
            payload,
            {
                headers: {
                    "Content-Type": "application/json"
                },
                timeout: 5000
            }
        );
        console.log("Google Automation Success");
    }

    catch (error) {
        console.error(
            "Google Automation Failed",
            error.message
        );
    }
}

module.exports = { triggerBookingAutomation }