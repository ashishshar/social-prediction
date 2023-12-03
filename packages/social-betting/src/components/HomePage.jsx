import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tab } from 'react-bootstrap';
import OpenBets from './OpenBets';
import MatchedBets from './MatchedBets';
import ClosedBets from './ClosedBets';
import Wallet from './Wallet';
import BetForm from './BetForm';
import FooterNavbar from './FooterNavbar';
import GoogleLoginProviderWrapper from './GoogleLoginButton';
import axios from 'axios';


const HomePage = () => {
    const [activeTab, setActiveTab] = useState('open');
    const [balance, setBalance] = useState(0);
    const [bets, setBets] = useState({
        openBets: [],
        matchedBets: [],
        closedBets: []
    });

    useEffect(() => {
        fetchBets('open');
        fetchBets('matched');
        fetchBets('closed');
        fetchBalance();
    }, []);


    const handleBetAccepted = () => {
        fetchBets('open');
        fetchBets('matched');
        fetchBets('closed');
    };


    const fetchBalance = async () => {
        try {
            const response = await axios.get('http://localhost:3030/api/transactions/balance');
            setBalance(response.data.balance);
        } catch (error) {
            console.error('Error fetching balance:', error);
        }
    };

    const onBalanceUpdate = (amount) => {
        setBalance(amount);
    };


    const fetchBets = async (status) => {
        try {
            const response = await fetch(`http://localhost:3030/api/bets/${status}`); // Replace with your actual API endpoint
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setBets(prevBets => ({
                ...prevBets,
                [`${status}Bets`]: data
            }));
        } catch (error) {
            console.error('Error fetching bets:', error);
        }
    };

    const getBetsByStatus = (status) => {
        return bets[`${status}Bets`];
    };

    // Function to handle tab selection
    const onSelectTab = (tab) => {
        setActiveTab(tab); // Update the activeTab state
    };

    return (
        <div style={{ minHeight: '100vh', background: "#212529" }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px',
                position: 'fixed',
                width: '100%', // Ensure the bar stretches across the full width
                top: 0, // To make sure it sticks to the top
                zIndex: '1030', // Bootstrap's default for fixed navbar
                background: '#212529', // Bootstrap's default light background color
                color: '#f8f9fa', // Bootstrap's default dark text color for light backgrounds
                boxShadow: '0 2px 4px rgba(0,0,0,.1)', // Slight shadow for depth
            }}>
                <h5 style={{
                    margin: '0',
                    fontWeight: 'bold',
                    fontSize: '1.5rem',
                }}>SB</h5>
                <div>
                    <span>Balance - ${balance}
                    <GoogleLoginProviderWrapper clientId="460608069611-j13onr1uke9e3sh3583annarfa2ut0sj.apps.googleusercontent.com" />
                    </span>
                    
                </div>
            </div>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: '60px',
                paddingBottom: '30px',
                backgroundColor: '#212529',
                color: 'white',
                borderBottom: '1px solid #444',
                zIndex: '10', // Ensure this is below the top bar
                width: '100%',
            }}>
                <Tab.Container activeKey={activeTab} onSelect={(key) => setActiveTab(key)} style={{ width: '100%' }}>
                    <Tab.Content style={{ width: '100%' }}>
                        <Tab.Pane eventKey="open" style={{ padding: 0 }}>
                            <OpenBets bets={getBetsByStatus('open')} walletBalance={balance} onBalanceUpdate={onBalanceUpdate}  onBetAccepted={handleBetAccepted} />
                        </Tab.Pane>
                        <Tab.Pane eventKey="matched" style={{ padding: 0 }}>
                            <MatchedBets bets={getBetsByStatus('matched')}/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="closed" style={{ padding: 0 }}>
                            <ClosedBets bets={getBetsByStatus('closed')}/>
                        </Tab.Pane>
                        {activeTab === 'addBet' && <Tab.Pane eventKey="addBet" style={{ padding: 0 }}>
                            <BetForm onSelectTab={onSelectTab} walletBalance={balance}/>
                        </Tab.Pane>}
                        <Tab.Pane eventKey="wallet" style={{ padding: 0 }} >
                            <Wallet walletBalance={balance} onBalanceUpdate={onBalanceUpdate}/>
                        </Tab.Pane>
                    </Tab.Content>
                </Tab.Container>

                <FooterNavbar activeTab={activeTab} onSelectTab={onSelectTab} />
            </div>
        </div>
    );
};

export default HomePage;
