import { Request } from "express";

export interface AuthRequest extends Request {
  id?: string;
}
export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  emailOtp?: string;
  emailOtpExpiresAt?: Date;
  password: string;
}
