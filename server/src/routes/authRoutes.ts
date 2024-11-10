import express , {Router}from "express";
import signup from "../auth/signup";
import login from "../auth/login"

const router = express.Router();

router.use("/auth",signup);
router.use("/auth",login);



export default router;