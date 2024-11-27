import express , {Router}from "express";
import signup from "../auth/signup";
import login from "../auth/login"
import refreshToken from "../auth/refresh-token";
import logout from "../auth/logout";


const router = express.Router();

router.use("/auth",signup);
router.use("/auth",login);
router.use("/auth",refreshToken)
router.use("/auth",logout)



export default router;