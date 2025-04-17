import { Schema, model } from "mongoose";

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        required: true
    },
    orderedFoods: {
        type: [Schema.Types.ObjectId],
        required: true
    },
    ttl: {
        type: Date,
        required: true
    },
    isVerified: {
        type: Boolean,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    },
    updatedAt: {
        type: Date,
        required: true
    }
})

export const userModel = model("user", userSchema)