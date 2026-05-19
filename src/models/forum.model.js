import mongoose from 'mongoose';
const forumSchema=new mongoose.Schema({
    users:{
        type:mongoose.Types.ObjectId,
          ref:"users",
          required:true
    },
    title:{
      type:String,
      required:true
    },
    description:{
        type:String,
        required:true
    },
    reply:{
        type:String,
        required
    }

},
{
  timestamps:true
  
});
export default mongoose.model('forums', forumSchema);