import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import BetCard from './BetCard';
const ClosedBets = ({ bets }) => {
  return (
    <div style={{ minHeight: '100vh' }}>
      <Container className="py-4">
        {bets.map((bet) => (
          <BetCard key={bet.id} bet={bet} status="closed" />
        ))}
      </Container>
    </div>
  );
};

export default ClosedBets;
