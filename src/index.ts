import dotenv from "dotenv";
import express, { Express } from "express";
import connectToDB from "./db/db.ts";
import cors from "cors";
import userRoutes from "./routes/auth.ts";
import recipeRoutes from "./routes/recipes.ts";

dotenv.config();
const app: Express = express();

await connectToDB();
app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoutes);
app.use("/api/recipe", recipeRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is now listening on PORT ${PORT}`));
