import mongoose, { Schema } from "mongoose";
const userSchema = new Schema({
    googleId: {
        required: true,
        type: String,
    },
    email: {
        required: true,
        type: String,
    },
    picture: {
        required: true,
        type: String,
    },
    name: {
        type: String,
        default: "",
    },
    passport: {
        type: String,
        default: "",
    },
    countryOfOrigin: {
        type: String,
        default: "",
    },
    trips: {
        type: [String],
        default: [],
    },
});
export default mongoose.model("users", userSchema);
//# sourceMappingURL=users.model.js.map