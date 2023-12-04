import express from 'express';
import { depositFunds, withdrawFunds, balanceFunds, transactionHistory, acceptBet } from '../controllers/transactionController.mjs';
import authenticate from '../middleware/authenticate.mjs';


const router = express.Router();

router.post('/deposit',  depositFunds);
router.post('/withdraw',  withdrawFunds);
router.get('/balance',  balanceFunds);
router.post('/accept-bet',  acceptBet);
router.get('/transaction-history', transactionHistory);
// router.get('/transaction-history', authenticate, transactionHistory);

export default router;
