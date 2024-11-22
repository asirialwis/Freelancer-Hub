import express, { Request, Response } from "express";
import userRefreshTokens from "../models/userRefreshToken"; // ensure this is your model
import jwt, { JwtPayload } from "jsonwebtoken";

const router = express.Router();

router.post('/refresh-token', async (req: any, res: any) => {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return res.status(401).json({ message: 'Refresh token not found' });
        }

        // Verify the refresh token with the correct secret
        const decodedRefreshToken = jwt.verify(refreshToken, process.env.JWT_SECRET_REFRESH as string) as JwtPayload;

        // Check if the refresh token exists in the database for this user

        const userRefreshToken = await userRefreshTokens.findOne({ token: refreshToken, userId: decodedRefreshToken.userId });

        if (!userRefreshToken) {
            return res.status(401).json({ message: 'Refresh token invalid or expired' });
        }

        // Remove the old refresh token from the database
        await userRefreshTokens.deleteOne({ _id: userRefreshToken._id });

        // Sign a new access token and refresh token
        const accessToken = jwt.sign(
            {
                userId: decodedRefreshToken.userId,
                username: decodedRefreshToken.username,
                email: decodedRefreshToken.email,
            }, process.env.JWT_SECRET_ACCESS as string, {
            subject: 'accessApi',
            expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN
        });

        const newRefreshToken = jwt.sign(
            {
                userId: decodedRefreshToken.userId,
                username: decodedRefreshToken.username,
                email: decodedRefreshToken.email,
            }, process.env.JWT_SECRET_REFRESH as string, {
            subject: 'refreshToken',
            expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN
        });

        // Insert the new refresh token into the database
        await userRefreshTokens.create({
            userId: decodedRefreshToken.userId,
            token: newRefreshToken,
        });

        return res.status(200).json({
            accessToken,
            refreshToken: newRefreshToken
        });

    } catch (error) {
        console.error('Error in refreshing token:', error);
        if (error instanceof jwt.TokenExpiredError || error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ message: 'Refresh token invalid or expired' });
        }
        return res.status(500).json({ message: (error as Error).message });
    }
});

export default router;
