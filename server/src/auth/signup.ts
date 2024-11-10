import express, { Request, Response, NextFunction } from "express";
import User from "../models/User";
import jwt from "jsonwebtoken";
const app = express();

const signup = app.post(
    "/signup",
    async (req: Request, res: Response, next: NextFunction) => {
        const { username, email, password } = req.body;

        const newUser = new User({
            username,
            email,
            password,
        });

        try {
            await newUser.save();
        } catch (err) {
            const error = new Error("An error occurred");
            return next(error);
        }
        let token;
        try {
            token = jwt.sign(
                { userid: newUser.id, email: newUser.email },
                process.env.JWT_SECRET as string,
                { expiresIn: "1h" }
            );
        } catch (err) {
            const error = new Error("An error occurred");
            return next(error);
        }
        res.status(201).json({
            sucess: true,
            data: {
                userId: newUser.id,
                email: newUser.email,
                token: token,
            },
        });
    }
);
export default signup;
