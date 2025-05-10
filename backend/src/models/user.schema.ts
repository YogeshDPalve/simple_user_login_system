import { model, Schema } from "mongoose";
import { IUser } from "../constants/interfaces";

const userSchema = new Schema<IUser>(
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
    emailOtp: {
      type: String,
    },
    emailOtpExpiresAt: {
      type: Date,
    },
    password: {
      required: true,
      type: String,
    },
  },
  { timestamps: true, strict: true }
);

export const userModel = model<IUser>("User", userSchema);
