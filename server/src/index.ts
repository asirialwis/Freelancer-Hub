import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

import dbConnect from "./config/db-config";
import authRoutes from "./routes/authRoutes";
import contactRoutes from "./routes/contactRoutes";
import profileRoutes from "./routes/profRoutes";

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow required methods
  allowedHeaders: ['Content-Type', 'Authorization'],   // Allow required headers
}));


// Middleware to parse JSON
app.use(express.json());
app.use('/' , authRoutes);
app.use('/',contactRoutes);
app.use('/',profileRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  dbConnect();
});
