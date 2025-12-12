import {Request, Response, NextFunction} from "express";

import {verifyToken, JwtPayload} from "../utils/jws";

import User from "../models/User";

declare global {
    namespace Express {
        interface Request {
            user: {
                _id: string;
                name: string;
                role: string
            }
        }
    }
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    
    const header = req.headers['x-access-token'] || req.headers.authorization;

    if (!header) {
        return res.status(401).json({message: "No token provided."});
    }
    
    const headerString = Array.isArray(header) ? header[0] : header;
    const token = headerString.split(' ')[1]; 

    if (!token) {
        return res.status(401).json({message: "Invalid token."});
    }

    try {
        const payload = verifyToken(token); 
        
        const user = await User.findById(payload.id).select("-passwordHash");

        if(!user) {
            return res.status(400).json({message: "User not found."});
        }

        req.user = {
            _id: user._id.toString(),
            name: user.name,
            role: user.role
        }

        next();

    } catch (error) {
        return res.status(401).json({message: "Invalid token.", error});
    }
}