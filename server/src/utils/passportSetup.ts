import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import dotenv from "dotenv";
dotenv.config();
const config = {
  CLIENT_ID: process.env.GOOGLE_CLIENT_ID as string,
  CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET as string,
};

passport.use(
  new Strategy(
    {
      clientID: config.CLIENT_ID,
      clientSecret: config.CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        done(null, profile);
      } catch (error) {
        done(error);
      }
    }
  )
);
passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

//read the session from the cookie
passport.deserializeUser((obj: any, done) => {
  done(null, obj);
});

export default passport;
