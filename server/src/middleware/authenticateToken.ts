import { verify } from "jsonwebtoken";

export default function authenticateToken(req: any, res: any, next: any) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if(!token){
        return res.status(401).json({
            success: false,
            message: "Access Denied: No token Provided",
        });
    }
    try{
        const decoded = verify(token, process.env.JWT_SECRET as string);
        req.user = decoded;
        next();
    }
    catch(err){
        console.log(err);
        return res.status(403).json({
            success: false,
            message: "Invalid or Expired Token",
        });
    }
}