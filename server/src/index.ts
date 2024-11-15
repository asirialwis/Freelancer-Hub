import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

import dbConnect from "./config/db-config";
import authRoutes from "./routes/authRoutes";
import contactRoutes from "./routes/contactRoutes";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

// Middleware to parse JSON
app.use(express.json());
app.use('/' , authRoutes);
app.use('/',contactRoutes)

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  dbConnect();
});
