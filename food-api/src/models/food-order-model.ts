import { Schema, model } from "mongoose"

const foodOrderSchema = new Schema({
    user: {
        type: String,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    foodOrderItems: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    updatedAt: {
        type: Date,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    }
})