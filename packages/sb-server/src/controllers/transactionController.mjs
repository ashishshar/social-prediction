let userBalance = 100;
// let transactions = [
//     { id: 1, description: 'Payment to xyz Shop', amount: -100 },
//     { id: 2, description: 'Payment to abc store', amount: -150 },
//     { id: 3, description: 'Credit from abc Ltd.', amount: 300 },
//     { id: 4, description: 'Transfer from John Doe', amount: 100 },
// ];

let transactions = []; // Starting empty transaction history

const addTransaction = (amount) => {
    const newTransaction = {
        id: Date.now(),
        description: amount >= 0 ? 'Deposit' : 'Withdrawal',
        amount
    };
    transactions.push(newTransaction);
};

export const depositFunds = (req, res) => {
    const { amount } = req.body;
    if (amount > 0) {
        userBalance += amount;
        addTransaction(amount);
        res.json({ balance: userBalance, transactions });
    } else {
        res.status(400).json({ message: 'Invalid deposit amount.' });
    }
};

export const withdrawFunds = (req, res) => {
    const { amount } = req.body;
    if (amount > 0 && amount <= userBalance) {
        userBalance -= amount;
        addTransaction(-amount);
        res.json({ balance: userBalance, transactions });
    } else {
        res.status(400).json({ message: 'Invalid withdrawal amount or insufficient funds.' });
    }
};


export const balanceFunds = (req, res) => {
    res.status(200).json({ balance: userBalance });
};

export const transactionHistory = (req, res) => {
    res.json(transactions);
};


export const acceptBet = (req, res) => {
    const { amount } = req.body;
    if (amount > 0 && amount <= userBalance) {
        userBalance -= amount;
        addTransaction(-amount);
        res.json({ balance: userBalance, transactions });
    } else {
        res.status(400).json({ message: 'Insufficient funds.' });
    }
};
acceptBet