import mongoose, { Schema } from "mongoose";
const userSchema = new Schema({
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
    friends: {
        type: [String],
        default: [],
    },
    trips: {
        type: [{}],
        default: [],
    },
});
export default mongoose.model("users", userSchema);
//# sourceMappingURL=users.model.js.map