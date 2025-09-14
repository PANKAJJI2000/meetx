import express from 'express';
import { logIn, signUp, addToUserHistory, getUserHistory } from '../controllers/user.js';

const router = express.Router();

// Add middleware to log route access
router.use((req, res, next) => {
    console.log(`User route accessed: ${req.method} ${req.path}`);
    next();
});

// Add a test route to verify router is working
router.get('/test', (req, res) => {
    res.json({ message: 'User routes are working!', timestamp: new Date().toISOString() });
});

// Define your routes here
router.post("/signUp", signUp);
router.post("/login", logIn);
router.post("/add_to_activity", addToUserHistory);
router.get("/get_all_activity", getUserHistory);

// Log all routes in this router
console.log('User router routes registered:');
router.stack.forEach((layer) => {
    if (layer.route) {
        const methods = Object.keys(layer.route.methods).join(',').toUpperCase();
        console.log(`${methods} /api/v1/users${layer.route.path}`);
    }
});

export default router;
