import express, { Request, Response } from "express";
import User from "../models/User.ts";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

// registration

router.post("/register", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const isExistingUser = await User.findOne({ email });

    if (isExistingUser) {
      return res.status(400).json({
        message:
          "User already exists with same email! Please try with a different email",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({
      success: true,
      message: "user created successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong! Please try again",
    });
  }
});

// Login route

router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const currentUser = await User.findOne({ email });

    if (!currentUser) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isPasswordMatch = await bcrypt.compare(
      password,
      currentUser.password
    );
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Pasword",
      });
    }

    const token = jwt.sign(
      {
        userId: currentUser._id,
      },
      "JWT_SECRET",
      { expiresIn: "1h" }
    );

    res.status(200).json({
      success: true,
      message: "Login Successfully",
      token,
      userId: currentUser._id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong! Please try again.",
    });
  }
});

export default router;
