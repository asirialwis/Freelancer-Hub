import express, { Request, Response } from "express";
import User from "../models/User";
import userRefreshTokens from "../models/userRefreshToken";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/login", async (req: any, res: any) => {
    let { email, password } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({ email: email });
    } catch {
        return res.status(422).json({ message: "User Not Found" });
    }
    if (!existingUser || existingUser.password != password) {
        return res.status(401).json({ message: "Invalid Credentials" });
    }

    let accessToken;
    let refreshToken;
    try {
        accessToken = jwt.sign(
            {
                userId: existingUser.id,
                username: existingUser.username,
                email: existingUser.email,
            },
            process.env.JWT_SECRET_ACCESS as string,
            {expiresIn:process.env.ACCESS_TOKEN_EXPIRES_IN}
        );
        refreshToken = jwt.sign(
            {
                userId: existingUser.id,
                username: existingUser.username,
                email: existingUser.email,
            },
            process.env.JWT_SECRET_REFRESH as string,
            {expiresIn:process.env.REFRESH_TOKEN_EXPIRES_IN}
        );
    } catch (err) {
        return res.status(500).json({ message: "Token Generation Failed" });
    }
    const newUserRefreshToken = new userRefreshTokens({
        userId: existingUser.id,
        token: refreshToken,
    });
    await newUserRefreshToken.save();

    res.status(200).json({
        sucess: true,
        data: {
            userId: existingUser.id,
            username: existingUser.username,
            email: existingUser.email,
            accessToken,
            refreshToken,
        },
    });
});

export default router;
