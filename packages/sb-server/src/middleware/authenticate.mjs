// middleware/authenticate.js
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';

const client = new OAuth2Client('460608069611-j13onr1uke9e3sh3583annarfa2ut0sj.apps.googleusercontent.com');

const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: '460608069611-j13onr1uke9e3sh3583annarfa2ut0sj.apps.googleusercontent.com',
    });
    const payload = ticket.getPayload();
    req.user = payload;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Authentication failed!' });
  }
};



export default authenticate;
