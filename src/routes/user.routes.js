import express from 'express';

const router = express.Router();
// admin endpoints
router.get("/users", getAllUser);

router.route("/user/:userId")
    .patch( updateUser )
    .delete( removeUser )

export default router;