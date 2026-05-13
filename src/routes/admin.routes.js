import express from 'express';
import { getAllUser, removeUser, updateUser } from '../controller/admin.controller.js';

const router = express.Router();
// admin endpoints
router.get("/users", getAllUser);

router.route("/user/:userId")
    .patch( updateUser )
    .delete( removeUser )

export default router;