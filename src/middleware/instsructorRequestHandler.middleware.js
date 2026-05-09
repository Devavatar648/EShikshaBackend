import jwt from 'jsonwebtoken';
import { ErrorResponse } from '../entity/ErrorResponse.js';

export const instructorRequestHandler = (req, res, next)=>{
    try{
        if(!req.headers.authorization){
            throw "Invalid Token Format Or No token provided";
        }
        const token = req.headers.authorization.split(" ")[1];
        const result = jwt.verify(token, process.env.SECRET_KEY);
        if(result.role==="INSTRUCTOR"){
            req.body['instructor']=result._id;
            console.log("Inside if");
            next();
        }else{
            throw "This url is restricted for you.";
        }
    }catch(err){
        console.log(err);
        next(new ErrorResponse(401, err));
    }
}