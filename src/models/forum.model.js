import mongoose from 'mongoose';

const forumSchema = new mongoose.Schema({
  users: {
    type: String,
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
      date: { type: Date, default: Date.now }
    }
  ]
}, {
  timestamps: true,
  strict: false
});

export default mongoose.model('forums', forumSchema);