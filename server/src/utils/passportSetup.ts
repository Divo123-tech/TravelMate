import passport from "passport"; // Importing Passport.js for authentication.
import { Strategy as GoogleStrategy } from "passport-google-oauth20"; // Importing the Google OAuth 2.0 strategy for Passport.js.
import dotenv from "dotenv"; // Importing dotenv to load environment variables from a .env file.

dotenv.config(); // Load environment variables from the .env file into process.env.

const config = {
  CLIENT_ID: process.env.GOOGLE_CLIENT_ID as string, // Reading the Google Client ID from environment variables.
  CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET as string, // Reading the Google Client Secret from environment variables.
};

// Setting up the Google OAuth 2.0 strategy for Passport.
passport.use(
  new GoogleStrategy(
    {
      clientID: config.CLIENT_ID, // Setting the client ID for Google OAuth.
      clientSecret: config.CLIENT_SECRET, // Setting the client secret for Google OAuth.
      callbackURL: `${
        (process.env.APP_LOCATION as string) == "localhost"
          ? ""
          : "https://travel-mate-yz4dtsmfwq-as.a.run.app"
      }/api/auth/google/callback`, // The URL where Google will redirect users after authentication.
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        done(null, profile);
      } catch (error) {
        done(error); // Handle any errors that occur during the verification process.
      }
    }
  )
);

// Serialize the user ID to save it in the session cookie.
passport.serializeUser((user: any, done) => {
  done(null, user.id); // Save the user ID to the session.
});

// Deserialize the user ID from the session cookie to reconstruct the user object.
passport.deserializeUser((id: string, done) => {
  // Typically, you would look up the user by their ID in the database here.
  done(null, { id }); // For simplicity, we're just passing the ID back as the user object.
});

export default passport; // Exporting the configured Passport instance.
