import express from "express" ;
import { deleteAnnouncement, publishAnnocement } from "../controller/annocements.controller.js";



const router = express.Router();
// --- ANNOUNCEMENT ROUTES ---
// 1. Get all announcements (Student & Instructor see this)
router.post('/announcements', publishAnnocement);
router.delete('/announcements',deleteAnnouncement );

// 2. Post new announcement (Instructor calls this)
// router.post('/announcements', (req, res) => {
//   const newAnn = { id: db.announcements.length + 1, ...req.body, date: new Date().toISOString() };
//   db.announcements.unshift(newAnn); // Add to top
//   res.status(201).json(newAnn);
// });

// --- FORUM ROUTES ---
// 3. Get all forum posts
 router.get('/forum', (req, res) => res.json(forums.posts));

// // 4. Create a new forum thread
 router.post('/forum', (req, res) => {
   const newPost = { id: db.posts.length + 1, ...req.body, replies: [] };
   forums.posts.unshift(newPost);
   res.status(201).json(newPost);
 });

 // 5. Public Reply logic (Everyone can reply)
 router.post('/forum/:id/reply', (req, res) => {
  const post = forums.posts.find(p => p.id == req.params.id);
  if (post) {
    const reply = { ...req.body, date: new Date().toLocaleTimeString() };
    post.replies.push(reply); // This makes the reply public for everyone
     res.status(201).json(reply);
  } else {
     res.status(404).send("Post not found");
  }
});

export default router;