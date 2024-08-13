import { Router } from "express"; // Importing the Router function from the Express framework to create a new router instance.
import locationRouter from "./routes/locations.router.js"; // Importing the router for handling location-related routes.
import authRouter from "./routes/auth.router.js"; // Importing the router for handling authentication-related routes.
import usersRouter from "./routes/users.router.js"; // Importing the router for handling user-related routes.
import { isAuthenticated } from "./controllers/auth.controller.js"; // Importing the middleware function that checks if a user is authenticated.

const api = Router(); // Creating a new router instance. This instance will handle all the API routes.

// Route for handling location-related requests. The `locationRouter` is responsible for managing all sub-routes under "/locations".
api.use("/locations", locationRouter);

// Route for handling Google authentication-related requests. The `authRouter` is responsible for managing all sub-routes under "/auth/google".
api.use("/auth/google", authRouter);

// Route for handling user-related requests.
// The `isAuthenticated` middleware function is executed first to ensure the user is authenticated before allowing access to the `usersRouter`.
api.use("/users", isAuthenticated, usersRouter);

export default api; // Exporting the `api` router instance so it can be used in other parts of the application.
