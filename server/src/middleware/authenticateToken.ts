import { verify } from "jsonwebtoken";


export default async function authenticateToken(req: any, res: any, next: any) {
    const authHeader = req.headers["authorization"];
    const accessToken = authHeader && authHeader.split(" ")[1];

    if(!accessToken){
        return res.status(401).json({
            success: false,
            message: "Access Denied: No token Provided",
        });
    }
   
    try{
        const decoded = verify(accessToken, process.env.JWT_SECRET_ACCESS as string);
        req.accessToken = {value: accessToken};
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