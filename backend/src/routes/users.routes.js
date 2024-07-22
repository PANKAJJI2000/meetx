import express from 'express';
import { logIn ,signUp ,addToUserHistory ,getUserHistory} from '../controllers/user.js';

const router = express.Router();

// Define your routes here
router
.route("/signUp")
.post(signUp)

router
.route("/login")
.post(logIn)

router
.route("/add_to_activity")
.post(addToUserHistory)

router
.route("/get_all_activity")
.get(getUserHistory)


export default router;
