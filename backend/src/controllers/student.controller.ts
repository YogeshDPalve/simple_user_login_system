import { Request, Response } from "express";
import { userModel } from "../models/user.schema";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken";
import { AuthRequest } from "../constants/interfaces";

const registerUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).send({
        success: false,
        message: "All fields are required",
      });
    }

    const checkUser = await userModel.findOne({ email });
    if (checkUser) {
      return res.status(400).send({
        success: false,
        message: "User already exists try with another email.",
      });
    }

    let hashedPassword: string = await bcrypt.hash(password, 10);

    const student = await userModel.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    return res.status(200).send({
      success: true,
      message: "User created Successfully",
      student,
    });
  } catch (error) {
    return res.status(500).send({
      success: true,
      message: "Internal server error",
      error,
    });
  }
};

const userLogin = async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({
      success: false,
      message: "All fields are required",
    });
  }

  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(400).send({
      success: false,
      message: "User not found please register first.",
    });
  }

  const checkPassword = bcrypt.compare(password, user.password);
  if (!checkPassword) {
    return res.status(400).send({
      success: false,
      message: "Invalid Email or Password",
    });
  }

  generateToken(user, res, `welcome back ${user.firstName}`);
};

const getUser = async (req: AuthRequest, res: Response): Promise<any> => {
  const userId: string = req.id as string;
  const user = await userModel.findOne({ _id: userId }).select("-password");

  if (!user) {
    return res.status(404).send({
      success: false,
      message: "Invalid Email or Password",
    });
  }

  return res.status(200).send({
    success: true,
    message: "student details get successfully",
    user,
  });
};
export { registerUser, userLogin, getUser };
