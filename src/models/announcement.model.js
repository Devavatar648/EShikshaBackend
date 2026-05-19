
import mongoose from 'mongoose';
const annocementSchema = new mongoose.Schema({
 instructor:{
  type:mongoose.Types.ObjectId,
  ref:"users",
  required:true

 },
 message:{
  type:String,
  required:true
 },
 course:{
   type:mongoose.Types.ObjectId,
    required:true
 }

},{
  timestamps:true
  
});

export default mongoose.model('annocements', annocementSchema);
