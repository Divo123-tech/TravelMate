import dotenv from "dotenv";
dotenv.config();
import app from "./middleware/middleware.js";
const port = 3000;
app.listen(port, () => {
    console.log("listening on port " + port);
});
//# sourceMappingURL=server.js.map