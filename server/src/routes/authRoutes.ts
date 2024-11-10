import express , {Router}from "express";
import signup from "../auth/signup";

const router = express.Router();

router.use("/auth",signup);


export default router;