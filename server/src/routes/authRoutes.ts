import express , {Router}from "express";
import signup from "../auth/signup";
import login from "../auth/login"
import refreshToken from "../auth/refresh-token";

const router = express.Router();

router.use("/auth",signup);
router.use("/auth",login);
router.use("/auth",refreshToken)



export default router;