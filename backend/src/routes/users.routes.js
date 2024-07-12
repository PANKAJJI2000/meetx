import express from 'express';
import { logIn ,signUp} from '../controllers/user.js';

const router = express.Router();

// Define your routes here
router
.route("/signUp")
.post(signUp)

router
.route("/login")
.post(logIn)
export default router;
