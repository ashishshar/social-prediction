import fs from 'fs';
import http from 'http';  // Import the http module
import https from 'https';
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

const isProduction = process.env.NODE_ENV === 'production';

let server


const options = {
  key: fs.readFileSync(process.env.SSL_CRT_FILE),
  cert: fs.readFileSync(process.env.SSL_KEY_FILE)
};

server = https.createServer(options, app);


app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/api/bets', betRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3030;

server.listen(PORT, () => {
  console.log(`Server running on ${isProduction ? 'https' : 'http'}://localhost:${PORT}`);
});

