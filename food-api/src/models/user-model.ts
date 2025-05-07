import { Schema, model } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: false,
    default: "",
  },
  address: {
    type: String,
    required: false,
    default: "",
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  orderedItems: {
    type: [Schema.Types.ObjectId],
    ref: "order",
    required: false,
    default: [],
  },
  isVerified: {
    type: Boolean,
    required: false,
    default: false,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  updatedAt: {
    type: Date,
    required: true,
  },
});

export const userModel = model("user", userSchema);
