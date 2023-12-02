const demoBets = [
    { id: 1, maker: 'User1', prediction: 'Prediction 1', betAmount: 10, winningAmount: 20, status: 'open' },
    { id: 2, maker: 'User2', prediction: 'Prediction 2', betAmount: 20, winningAmount: 40, status: 'matched' },
    { id: 3, maker: 'User3', prediction: 'Prediction 3', betAmount: 30, winningAmount: 60, status: 'open' },
    { id: 4, maker: 'User4', prediction: 'Prediction 4', betAmount: 40, winningAmount: 80, status: 'closed' },
    { id: 5, maker: 'User5', prediction: 'Prediction 5', betAmount: 50, winningAmount: 100, status: 'open' },
    { id: 6, maker: 'User6', prediction: 'Prediction 6', betAmount: 60, winningAmount: 120, status: 'matched' },
    { id: 7, maker: 'User7', prediction: 'Prediction 7', betAmount: 70, winningAmount: 140, status: 'open' },
    { id: 8, maker: 'User8', prediction: 'Prediction 8', betAmount: 80, winningAmount: 160, status: 'matched' },
    { id: 9, maker: 'User9', prediction: 'Prediction 9', betAmount: 90, winningAmount: 180, status: 'open' },
    { id: 10, maker: 'User10', prediction: 'Prediction 10', betAmount: 100, winningAmount: 200, status: 'closed' },
    { id: 11, maker: 'User11', prediction: 'Prediction 11', betAmount: 110, winningAmount: 220, status: 'open' },
    { id: 12, maker: 'User12', prediction: 'Prediction 12', betAmount: 120, winningAmount: 240, status: 'matched' },
    { id: 13, maker: 'User13', prediction: 'Prediction 13', betAmount: 130, winningAmount: 260, status: 'open' },
    { id: 14, maker: 'User14', prediction: 'Prediction 14', betAmount: 140, winningAmount: 280, status: 'closed' },
    { id: 15, maker: 'User15', prediction: 'Prediction 15', betAmount: 150, winningAmount: 300, status: 'open' },
    { id: 16, maker: 'User16', prediction: 'Prediction 16', betAmount: 160, winningAmount: 320, status: 'matched' },
    { id: 17, maker: 'User17', prediction: 'Prediction 17', betAmount: 170, winningAmount: 340, status: 'open' },
    { id: 18, maker: 'User18', prediction: 'Prediction 18', betAmount: 180, winningAmount: 360, status: 'matched' },
    { id: 19, maker: 'User19', prediction: 'Prediction 19', betAmount: 190, winningAmount: 380, status: 'open' },
    { id: 20, maker: 'User20', prediction: 'Prediction 20', betAmount: 200, winningAmount: 400, status: 'closed' },
    { id: 21, maker: 'User21', prediction: 'Prediction 21', betAmount: 210, winningAmount: 420, status: 'open' },
    { id: 22, maker: 'User22', prediction: 'Prediction 22', betAmount: 220, winningAmount: 440, status: 'matched' },
    { id: 23, maker: 'User23', prediction: 'Prediction 23', betAmount: 230, winningAmount: 460, status: 'open' },
    { id: 24, maker: 'User24', prediction: 'Prediction 24', betAmount: 240, winningAmount: 480, status: 'closed' },
    { id: 25, maker: 'User25', prediction: 'Prediction 25', betAmount: 250, winningAmount: 500, status: 'open' },
    { id: 26, maker: 'User26', prediction: 'Prediction 26', betAmount: 260, winningAmount: 520, status: 'matched' },
    { id: 27, maker: 'User27', prediction: 'Prediction 27', betAmount: 270, winningAmount: 540, status: 'open' },
    { id: 28, maker: 'User28', prediction: 'Prediction 28', betAmount: 280, winningAmount: 560, status: 'matched' },
    { id: 29, maker: 'User29', prediction: 'Prediction 29', betAmount: 290, winningAmount: 580, status: 'open' },
    { id: 30, maker: 'User30', prediction: 'Prediction 30', betAmount: 300, winningAmount: 600, status: 'closed' },
];


export const getAllBetsByStatus = (req, res) => {
    const { status } = req.params;
    const betsByStatus = demoBets.filter((bet) => bet.status === status);
    res.status(200).json(betsByStatus);
};


// Controller function to get a bet by ID
export const getBetById = (req, res) => {
    const { id } = req.params;
    const bet = demoBets.find((bet) => bet.id === parseInt(id));
    if (!bet) {
        return res.status(404).json({ message: 'Bet not found' });
    }
    res.status(200).json(bet);
};


export const acceptBet = (req, res) => {
    const { id } = req.params;
    const index = demoBets.findIndex((bet) => bet.id === parseInt(id));
    if (index === -1) {
        return res.status(404).json({ message: 'Bet not found' });
    }
    demoBets[index].status = 'matched';
    res.status(200).json({ message: 'Bet accepted successfully', updatedBet: demoBets[index] });
};


export const createBet = (req, res) => {
    const { prediction, betAmount, maker } = req.body;
    if (!prediction || !betAmount || !maker) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }
    const newBet = {
        id: demoBets.length + 1,
        maker: maker,
        prediction,
        betAmount: parseInt(betAmount),
        winningAmount: parseInt(betAmount) * 2,
        status: 'open',
    };
    demoBets.push(newBet);
    res.status(201).json({ message: 'Bet created successfully', newBet });
};
