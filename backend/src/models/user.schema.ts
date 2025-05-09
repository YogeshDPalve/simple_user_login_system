import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    firstName: {
      required: true,
      type: String,
    },
    lastName: {
      required: true,
      type: String,
    },
    email: {
      required: true,
      unique: true,
      type: String,
    },
    password: {
      required: true,
      type: String,
    },
  },
  { timestamps: true, strict: true }
);

export const userModel = model("User", userSchema);
