import express from 'express';
import { depositFunds, withdrawFunds, balanceFunds, transactionHistory, acceptBet } from '../controllers/transactionController.mjs';

const router = express.Router();

router.post('/deposit', depositFunds);
router.post('/withdraw', withdrawFunds);
router.get('/balance', balanceFunds);
router.post('/accept-bet', acceptBet);
router.get('/transaction-history', transactionHistory);

export default router;
