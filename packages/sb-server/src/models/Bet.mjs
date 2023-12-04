import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    googleId: String,
    email: String,
    verifiedEmail: Boolean,
    name: String,
    givenName: String,
    familyName: String,
    picture: String,
    locale: String,
    hd: String,
});

export const User = mongoose.model('User', UserSchema, 'users');

const PredictionSchema = new mongoose.Schema({
    prediction: String,
    maker: String,
    betAmount: Number,
    winningAmount: Number,
    status: String,
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: [] }],
    shares: { type: Number, default: 0 },
    comments: [{
        text: String,
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        createdAt: { type: Date, default: Date.now }
    }],
});
export const Prediction = mongoose.model('Prediction', PredictionSchema, 'prediction');

