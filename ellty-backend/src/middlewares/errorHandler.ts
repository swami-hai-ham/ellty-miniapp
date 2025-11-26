import {type NextFunction, type Request, type Response } from "express";

export function errorHandler(err: any, Request: Request, Response: Response, next: NextFunction){
       const status = err.statusCode || 500;
       
       Response.status(status).json({
        success: false,
        message: err.message ||"Unexpected error", 
        error: err.payload
       })
}