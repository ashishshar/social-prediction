import { OAuth2Client } from 'google-auth-library';
import axios from 'axios';
import { User } from '../models/Bet.mjs';


const client = new OAuth2Client('460608069611-j13onr1uke9e3sh3583annarfa2ut0sj.apps.googleusercontent.com');


const fetchGoogleUserInfo = async (accessToken) => {
  try {
    const googleUserInfoUrl = 'https://www.googleapis.com/oauth2/v2/userinfo';
    const response = await axios.get(googleUserInfoUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user info:', error);
    throw new Error('Unable to fetch user info');
  }
}

const authenticate = async (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return res.status(401).json({ message: 'No authorization header provided!' });
  }

  const accessToken = authorizationHeader.split(' ')[1];
  if (!accessToken) {
    return res.status(401).json({ message: 'No access token provided!' });
  }

  try {
    const userInfo = await fetchGoogleUserInfo(accessToken);
    console.log('User Info:', userInfo);

    let user = await User.findOne({ googleId: userInfo.id });

    if (!user) {
      user = new User({
        googleId: userInfo.id,
        email: userInfo.email,
        verifiedEmail: userInfo.verified_email,
        name: userInfo.name,
        givenName: userInfo.given_name,
        familyName: userInfo.family_name,
        picture: userInfo.picture,
        locale: userInfo.locale,
        hd: userInfo.hd,
      });
      await user.save();
    }
    req.user = userInfo;
    next();
  } catch (err) {
    console.error('Error verifying access token:', err);
    res.status(401).json({ message: 'Authentication failed!', error: err.message });
  }
};

export default authenticate;