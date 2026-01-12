import { Request, Response } from "express";
import { User } from "../models/user.model";
import { hashPassword } from "../utils/hash";

const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, photo } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields ae required" });
    }

    const existingUser = await User.findOne(email);
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const hashedPassword = await hashPassword(password);

    const user = await User.create({ 
        name, 
        email, 
        password : hashedPassword,
        photo
    })

    res.status(201).json({
        message: 'User registered successfully',
        user
    })

  } catch (error) {
    res.status(500).json({message: 'Registration failed', error})
  }
};
