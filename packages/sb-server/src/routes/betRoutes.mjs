// src/routes/betRoutes.js
import express from 'express';
import { getAllBetsByStatus, getBetById, acceptBet, createBet } from '../controllers/betController.mjs';

const router = express.Router();

router.get('/:status', getAllBetsByStatus)
router.get('/bet/:id', getBetById);
router.put('/accept/:id', acceptBet);
router.post('/create', createBet);

export default router;
