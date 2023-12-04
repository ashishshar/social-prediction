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
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/api/bets', betRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3030;

if (process.env.HTTPS === 'true') {
  let key;
  let cert;

  try {
    key = fs.readFileSync(process.env.SSL_KEY_FILE, 'utf8');
    cert = fs.readFileSync(process.env.SSL_CRT_FILE, 'utf8');
  } catch (readError) {
    console.error('Error reading SSL files:', readError.message);
    process.exit(1); // Exit if there is an error
  }

  // Only proceed if both key and cert are successfully read
  const options = { key, cert };

  // Create an HTTPS server with the certificate and key
  const httpsServer = https.createServer(options, app);

  // Start the HTTPS server
  httpsServer.listen(PORT, () => {
    console.log('HTTPS Server running on port 3030');
  });
} else {
  // Create a regular HTTP server if HTTPS is not enabled
  app.listen(PORT, () => {
    console.log('HTTP Server running on port 3030');
  });
}