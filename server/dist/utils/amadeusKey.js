import axios from "axios";
// Function to obtain an Amadeus API access token using client credentials
export const getAmadeusToken = async () => {
    // Retrieve the Amadeus client ID and secret from environment variables
    const clientId = process.env.AMADEUS_CLIENT_ID || "";
    const clientSecret = process.env.AMADEUS_CLIENT_SECRET || "";
    // Validate that the environment variables are properly set
    if (!clientId || !clientSecret) {
        throw new Error("Missing environment variables: AMADEUS_CLIENT_ID and AMADEUS_CLIENT_SECRET");
    }
    // Construct the form data required for the OAuth2 token request
    const formData = new URLSearchParams({
        grant_type: "client_credentials", // OAuth2 grant type for client credentials
        client_id: clientId,
        client_secret: clientSecret,
    });
    try {
        // Make a POST request to the Amadeus OAuth2 token endpoint
        const response = await axios.post("https://api.amadeus.com/v1/security/oauth2/token", formData.toString(), // Convert the form data to a string format
        {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded", // Set the correct content type for form data
            },
        });
        // Return the access token from the response data
        return response.data.access_token;
    }
    catch (error) {
        // Handle errors by throwing a specific message
        throw new Error(`Failed to obtain Amadeus token: ${error.response?.data?.error_description || error.message}`);
    }
};
//# sourceMappingURL=amadeusKey.js.map