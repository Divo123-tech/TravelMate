import axios from "axios";
export const getAmadeusToken = async () => {
    const clientId = process.env.AMADEUS_CLIENT_ID || "";
    const clientSecret = process.env.AMADEUS_CLIENT_SECRET || "";
    if (!clientId || !clientSecret) {
        throw new Error("Missing environment variables: AMADEUS_CLIENT_ID and AMADEUS_CLIENT_SECRET");
    }
    // Build the form data object
    const formData = new URLSearchParams({
        grant_type: "client_credentials",
        client_id: clientId,
        client_secret: clientSecret,
    });
    // Make the POST request with Axios
    const response = await axios.post("https://api.amadeus.com/v1/security/oauth2/token", formData, {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
    });
    return response.data.access_token;
};
//# sourceMappingURL=amadeusKey.js.map