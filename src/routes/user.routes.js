import express from 'express';
import { getUserSettings, updateUserSettings } from '../controller/user.controller.js';
import { logout } from '../controller/auth.controller.js';

const router = express.Router();


router.route("/settings")
    .get( getUserSettings )
    .patch( updateUserSettings )

router.route("/logout")
    .post( logout )

export default router;