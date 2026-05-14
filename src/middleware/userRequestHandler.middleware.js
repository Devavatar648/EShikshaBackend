import jwt from 'jsonwebtoken';
import { ErrorResponse } from '../util/ErrorResponse.js';

export const userRequestHandler = (req, res, next)=>{
    try{
        if(!req.headers.authorization){
            throw "Invalid Token Format Or No token provided";
        }
        const token = req.headers.authorization.split(" ")[1];
        const result = jwt.verify(token, process.env.SECRET_KEY);
        if(result){
            req.user = {id:result._id}
            next();
        }else{
            throw new ErrorResponse(401, "This url is restricted for you.");
        }
    }catch(err){
        next(new ErrorResponse(401, err));
    }
}