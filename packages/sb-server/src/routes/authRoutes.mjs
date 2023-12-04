// routes/authRoutes.js
import express from 'express';
import authenticate from '../middleware/authenticate.mjs';

const router = express.Router();

router.post('/google', authenticate, (req, res) => {
  res.json({ user: req.user });
});

export default router;
