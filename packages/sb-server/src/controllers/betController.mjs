import { Prediction } from '../models/Bet.mjs';

export const getAllBetsByStatus = async (req, res) => {
    const { status } = req.params;
    try {
        const betsByStatus = await Prediction.find({ status });
        res.status(200).json(betsByStatus);
    } catch (error) {
        console.error('Error retrieving bets by status:', error);
        res.status(500).json({ error: 'Server Error' });
    }
};


export const getBetById = async (req, res) => {
    const { id } = req.params;
    try {
        const bet = await Prediction.findById(id);
        if (!bet) {
            return res.status(404).json({ message: 'Bet not found' });
        }
        res.status(200).json(bet);
    } catch (error) {
        console.error('Error retrieving bet by ID:', error);
        res.status(500).json({ error: 'Server Error' });
    }
};


export const acceptBet = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedBet = await Prediction.findOneAndUpdate(
            { _id: id },
            { $set: { status: 'matched' } },
            { new: true }
        );
    
        if (!updatedBet) {
            return res.status(404).json({ message: 'Bet not found' });
        }
    
        console.log('Bet updated successfully:', updatedBet);
        res.status(200).json({ message: 'Bet accepted successfully', updatedBet });
    } catch (error) {
        console.error('Error accepting bet:', error);
        res.status(500).json({ error: 'Server Error' });
    }
};

export const createBet = async (req, res) => {
    const { prediction, betAmount, maker } = req.body;
    const user = req.user;

    try {
        if (!prediction || !betAmount || !maker) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        // Create a new bet document
        const newBet = new Prediction({
            prediction,
            maker,
            betAmount: parseInt(betAmount),
            winningAmount: parseInt(betAmount) * 2,
            status: 'open',
        });

        // Save the new bet document to the database
        const savedBet = await newBet.save();

        res.status(201).json({ message: 'Bet created successfully', newBet: savedBet });
    } catch (error) {
        console.error('Error in createBet:', error);
        res.status(500).json({ error: 'Server Error' });
    }
};

export const betLikes = async (req, res) => {
    const predictionId = req.params.predictionId;
    const userId = '656db585fadcc3d450c06c61'//req.user._id; // Assuming you have user ID from the request

    try {
        const prediction = await Prediction.findById(predictionId);

        console.log(prediction, '==================')

        if (!prediction) {
            return res.status(404).send('Prediction not found');
        }

        if (prediction.likes.includes(userId)) {
            return res.status(200).json({ likes: prediction.likes.length });
        }

        prediction.likes.push(userId);
        await prediction.save();

        res.status(200).json({ likes: prediction.likes.length });
    } catch (error) {
        console.log(error)
        res.status(500).send('Server Error');
    }
}


export const betShare = async (req, res) => {
    const predictionId = req.params.predictionId;

    try {
        const prediction = await Prediction.findByIdAndUpdate(
            predictionId,
            { $inc: { shares: 1 } },
            { new: true }
        );

        if (!prediction) {
            return res.status(404).send('Prediction not found');
        }

        res.status(200).json({ shares: prediction.shares });
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
};

export const betComment = async (req, res) => {
    const predictionId = req.params.predictionId;
    const userId = '656db585fadcc3d450c06c61'//req.user._id; // Assuming you have user ID from the request
    const { text } = req.body;

    try {
        const prediction = await Prediction.findById(predictionId);

        if (!prediction) {
            return res.status(404).send('Prediction not found');
        }

        const newComment = {
            text,
            user: userId,
            createdAt: new Date()
        };

        prediction.comments.push(newComment);
        await prediction.save();

        res.status(200).json(prediction.comments);
    } catch (error) {
        console.log(error)
        res.status(500).send('Server Error');
    }
};