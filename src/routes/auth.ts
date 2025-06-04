import express, { Request, Response } from "express";
import User from "../models/User.ts";
import bcrypt from "bcryptjs";

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

export default router;
