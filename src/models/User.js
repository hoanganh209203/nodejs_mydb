import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        require: true,
        minLeght: 3
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
    },
    confirmPassword: {
        type: String,
        require: true,
    },
    role:{
        type: String,
        default:"member"
    }

}, {
    timestamps: true,
    versionKey: false,
});

export default mongoose.model('User', userSchema)