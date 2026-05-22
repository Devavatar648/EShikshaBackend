export const errorHandler = (err, _, res, __)=>{
    res.status(err.statusCode||500).json({message:err.message||"Internal server error"});
}