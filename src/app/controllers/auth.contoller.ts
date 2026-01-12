import { Request, Response } from "express";
import { User } from "../models/user.model";
import { comparedPassword, hashPassword } from "../utils/hash";
import { generateToken } from "../utils/jwt";

export const register = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password, photo } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "All fields ae required" });
    }

    const existingUser = await User.findOne({email});
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const hashedPassword = await hashPassword(password);

    const user = await User.create({
        firstName,
        lastName,
        email,
        password : hashedPassword,
        photo
    });

    // console.log(user);

    res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: "Registration failed", error });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password is required" });
    }

    const user = await User.findOne({email})
    if (!user) {
      return res.status(401).json({ message: "Invalid Email" });
    }

    const isPasswordMatch = await comparedPassword(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const token = generateToken({
      id: user?._id,
      role: user?.role,
    });

    res.status(200).json({
      message: "Login Successful",
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({ message: "Login falied", error });
  }
};
