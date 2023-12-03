import React, { useState, useEffect } from 'react';
import CustomModal from './CustomModal';
import axios from 'axios';
import '../style/WalletPage.css';

const WalletPage = ({walletBalance,  onBalanceUpdate}) => {
    const [balance, setBalance] = useState(walletBalance);
    const [amount, setAmount] = useState('');
    const [showDepositModal, setShowDepositModal] = useState(false);
    const [showWithdrawModal, setShowWithdrawModal] = useState(false);
    const [history, setHistory] = useState([]);
    // Fetch balance from the server
    useEffect(() => {
        setBalance(walletBalance);
    }, [walletBalance]);


    useEffect(() => {
        // Fetch balance and transaction history when the component mounts
        const fetchWalletDetails = async () => {
            try {
                const balanceResponse = await axios.get('http://social-test.theox.co:3030/api/transactions/balance');
                setBalance(balanceResponse.data.balance);
                const historyResponse = await axios.get('http://social-test.theox.co:3030/api/transactions/transaction-history');
                setHistory(historyResponse.data);
            } catch (error) {
                console.error('Error fetching wallet details:', error);
            }
        };

        fetchWalletDetails();
    }, []);


    const handleDeposit = async () => {
        const numberAmount = parseFloat(amount);
        if (numberAmount > 0) {
            try {
                const response = await axios.post('http://social-test.theox.co:3030/api/transactions/deposit', { amount: numberAmount });
                
                setBalance(response.data.balance);
                setHistory(response.data.transactions);
                setAmount('');
                setShowDepositModal(false);
                onBalanceUpdate(response.data.balance);
            } catch (error) {
                console.error('Error depositing funds:', error);
            }
        } else {
            alert('Please enter a valid amount');
        }
    };

    const handleWithdraw = async () => {
        const numberAmount = parseFloat(amount);
        if (numberAmount > 0 && numberAmount <= balance) {
            try {
                const response = await axios.post('http://social-test.theox.co:3030/api/transactions/withdraw', { amount: numberAmount });
                setBalance(response.data.balance);
                setHistory(response.data.transactions);
                setAmount('');
                setShowWithdrawModal(false);
                onBalanceUpdate(response.data.balance);
            } catch (error) {
                console.error('Error withdrawing funds:', error);
            }
        } else {
            alert('Please enter a valid amount');
        }
    };

    const openDepositModal = () => setShowDepositModal(true);
    const openWithdrawModal = () => setShowWithdrawModal(true);

    return (
        <div className="wallet-container">
            <div className="balance-container">
                <span className="balance-title">Total Balance</span>
                <span className="balance-value">${balance}</span>
            </div>

            <div className="actions-container">
                <button className="action-button" onClick={openDepositModal}>Add Money</button>
                <button className="action-button" onClick={openWithdrawModal}>Withdraw</button>
            </div>
            {/* Deposit Modal */}
            <CustomModal isOpen={showDepositModal} onClose={() => setShowDepositModal(false)} title="Deposit Funds">
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                />
                <button className="confirm-button" onClick={handleDeposit}>Confirm Deposit</button>
            </CustomModal>

            {/* Withdraw Modal */}
            <CustomModal isOpen={showWithdrawModal} onClose={() => setShowWithdrawModal(false)} title="Withdraw Funds">
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                />
                <button className="confirm-button" onClick={handleWithdraw}>Confirm Withdrawal</button>
            </CustomModal>

            <div className="history-container" bg="dark">
                <h2>History</h2>
                {history?.map((item) => (
                    <div key={item.id} className="history-item">
                        {item.description} <span className={`amount ${item.amount < 0 ? 'negative' : 'positive'}`}>{item.amount < 0 ? '-' : '+'}${Math.abs(item.amount)}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WalletPage;
