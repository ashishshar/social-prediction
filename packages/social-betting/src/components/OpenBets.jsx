import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import BetCard from './BetCard';

const OpenBets = ({ bets, walletBalance, onBalanceUpdate, onBetAccepted }) => {
  const handleBetAccepted = (betAmount, id) => {
    onBalanceUpdate(walletBalance - betAmount);
    onBetAccepted(id)
  };

  return (
    <div style={{ minHeight: '100vh' }}>
      <Container className="py-4">
        {bets.map((bet) => (
          <BetCard 
            key={bet.id} 
            bet={bet} 
            status="open"  
            walletBalance={walletBalance} 
            onBetAccepted={() => handleBetAccepted(bet.betAmount, bet.id)}
          />
        ))}
      </Container>
    </div>
  );
};

export default OpenBets;
