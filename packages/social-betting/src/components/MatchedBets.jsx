import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container} from 'react-bootstrap';
import BetCard from './BetCard';

const MatchedBets = ({ bets }) => {
  return (
    <div style={{minHeight: '100vh' }}>
      <Container className="py-4">
        {bets.map((bet) => (
          <BetCard key={bet.id} bet={bet} status="matched" />
        ))}
      </Container>
    </div>
  );
};

export default MatchedBets;

