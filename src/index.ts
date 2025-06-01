import dotenv from "dotenv";
import express,{Express} from "express";
import connectToDB from "./db/db.ts";
import cors from 'cors'


dotenv.config();
const app:Express =express()

connectToDB()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 5000

app.listen(PORT,()=>console.log(`Server is now listening on PORT ${PORT}`))