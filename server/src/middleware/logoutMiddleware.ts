import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

// Extend Request type to include custom properties
interface CustomRequest extends Request {
    userId?: string;
    refreshToken?: string;
    user?: any;
}

export default function logoutMiddleware(
    req: CustomRequest,
    res: Response,
    next: NextFunction
): void {
    const authHeader = req.headers["authorization"];
    const refreshToken = authHeader && authHeader.split(" ")[1];

    if (!refreshToken) {
        res.status(401).json({
            success: false,
            message: "Access Denied: No token Provided",
        });
        return; // Stop execution here
    }

    try {
        const decoded = verify(
            refreshToken,
            process.env.JWT_SECRET_REFRESH as string
        );

        if (typeof decoded === "object" && "userId" in decoded) {
            req.userId = decoded.userId; // Attach the userId to the request
            req.refreshToken = refreshToken;
            next(); // Pass control to the next handler
        } else {
            res.status(403).json({
                success: false,
                message: "Invalid or Malformed Token",
            });
        }
    } catch (error) {
        console.error(error);
        res.status(403).json({
            success: false,
            message: "Invalid or Expired Token",
        });
    }
}
