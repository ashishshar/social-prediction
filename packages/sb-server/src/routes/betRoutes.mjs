import express from 'express';
import { getAllBetsByStatus, getBetById, acceptBet, createBet, betLikes, betShare, betComment } from '../controllers/betController.mjs';
import authenticate from '../middleware/authenticate.mjs';
const router = express.Router();

router.get('/:status', getAllBetsByStatus)
router.get('/bet/:id', getBetById);
router.put('/accept/:id', acceptBet);
router.post('/create', authenticate, createBet);
router.post('/like/:predictionId', authenticate, betLikes);
router.post('/share/:predictionId', authenticate, betShare);
router.post('/comment/:predictionId', authenticate, betComment);


export default router;
