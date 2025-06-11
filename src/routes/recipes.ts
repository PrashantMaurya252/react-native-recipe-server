import express, { Request, Response } from "express";
import { authMiddleware, AuthRequest } from "../middleware/middleware.ts";
import Recipe from "../models/Recipe.ts";

const router = express.Router();

router.post(
  "/create-receipe",
  authMiddleware,
  async (req: AuthRequest, res: Response) => {
    const { title, description, difficulty } = req.body;
    const newelyCreatedRecipe = new Recipe({
      title,
      description,
      difficulty,
      createdBy: req.userId,
    });

    await newelyCreatedRecipe.save();

    res.status(201).json({
      success: true,
      message: "Recipe is added successfully !",
    });
  }
);

export default router;
