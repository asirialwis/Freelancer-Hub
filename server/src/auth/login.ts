import express, { Request, Response, NextFunction } from "express";
import User from "../models/User";
import jwt from "jsonwebtoken";
const app = express();

const login = app.post("/login", async (req: Request, res: Response, next: NextFunction) => {
    let { email, password } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({ email: email });
    } catch {
        const error = new Error("Error! User not Found");
        return next(error);
    }
    if (!existingUser || existingUser.password != password) {
        const error = Error("Wrong details please check at once");
        return next(error);
    }

    let token;
    try {
        token = jwt.sign(
            {
                userId: existingUser.id,
                username: existingUser.username,
                email: existingUser.email,
            },
            process.env.JWT_SECRET as string,
            { expiresIn: "1h" }
        );
    } catch (err) {
        console.log(err);
        const error = new Error("Error! JWT not created");
        return next(error);
    }
    res.status(200).json({
        sucess: true,
        data: {
            userId: existingUser.id,
            username: existingUser.username,
            email: existingUser.email,
            token,
        },
    });
});

export default login;
