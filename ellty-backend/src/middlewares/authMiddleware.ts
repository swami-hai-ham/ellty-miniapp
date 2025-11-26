import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import { env } from "../config/config.js";
export async function authMiddleware(req: Request, res: Response, next: NextFunction){
    try{
    const auth = req.headers.authorization;
    if(!auth || !auth.startsWith("Bearer "))
        return res.status(401).json({success: false, message: "Unauthorized"})
    const token = auth.split(" ")[1];
    if(!token)
        return res.status(401).json({success: false, message: "Unauthorized"})
    const secret = env.JWT_SECRET;
    const decoded = await jwt.verify(token, secret!) as any;
    res.locals.id = decoded.id;
    next();
}catch(e){
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
}
}