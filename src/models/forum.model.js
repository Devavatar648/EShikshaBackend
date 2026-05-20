import mongoose from 'mongoose';

const forumSchema = new mongoose.Schema({
  
  users: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
    default: "Anonymous"
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  
  replies: [
    {
      user: { type: String, default: "Anonymous" },
      reply: { type: String, required: true },
      date: { type: String }
    }
  ]
}, {
  timestamps: true,
  strict: false
});

export default mongoose.model('forums', forumSchema);