import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import betRoutes from './src/routes/betRoutes.mjs';
import transactionRoutes from './src/routes/transactionRoutes.mjs';

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use('/api/bets', betRoutes);
app.use('/api/transactions', transactionRoutes);

const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
