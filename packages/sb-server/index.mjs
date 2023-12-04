import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import betRoutes from './src/routes/betRoutes.mjs';
import transactionRoutes from './src/routes/transactionRoutes.mjs';
import authRoutes from './src/routes/authRoutes.mjs';
import connectDB from './src/config/database.mjs';
import morgan from 'morgan';

const app = express();
connectDB();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/api/bets', betRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
