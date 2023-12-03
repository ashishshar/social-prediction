import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faComment, faShare } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const BetCard = ({ bet, status, walletBalance, onBetAccepted }) => {

    const handleAcceptBet = async (betId) => {
        if (walletBalance >= bet.betAmount) {
            try {
                const updateBalance = await axios.post('http://social-test.theox.co:3030/api/transactions/accept-bet', { amount: bet.betAmount });
                if (updateBalance.status === 200) {
                    const response = await axios.put(`http://social-test.theox.co:3030/api/bets/accept/${betId}`);
                    if (response.status === 200) {
                        console.log(`Accepted bet with ID: ${betId}`);
                        onBetAccepted(bet.id, bet.betAmount); // Update the wallet balance
                    } else {
                        throw new Error('Failed to accept bet');
                    }
                } else {
                    throw new Error('Insufficient balance');
                }

            } catch (error) {
                console.error('Error accepting bet:', error);
            }
        } else {
            alert('Insufficient balance');
        }
    };

    const handleLike = () => {
        // Perform like action
        console.log('Liked bet:', bet.id);
    };

    const handleComment = () => {
        // Perform comment action
        console.log('Commented on bet:', bet.id);
    };

    const handleShare = () => {
        // Perform share action
        console.log('Shared bet:', bet.id);
    };

    return (
        <Card className="mb-3 text-white bg-dark" style={{ borderRadius: '15px' }}>
            <Card.Body>
                <div className="d-flex align-items-center">
                    <div>
                        <Card.Title>{bet.prediction}</Card.Title>
                        <Card.Text className="mb-0">{bet.maker}</Card.Text>
                    </div>
                </div>
                <Card.Text>
                    Bet Amount: {bet.betAmount} <br />
                    Winning Amount: {bet.winningAmount}
                </Card.Text>
            </Card.Body>

            <Card.Footer className="bg-light text-white bg-dark">
                <div className="d-flex justify-content-between">
                    {status === 'open' && (
                        <Button variant="link" style={{ borderRadius: '10px', color: '#fff', textDecoration: 'none', }} onClick={() => handleAcceptBet(bet.id)}>
                            Accept
                        </Button>
                    )}
                    <Button variant="link" onClick={() => handleLike(bet.id)} style={{ textDecoration: 'none', color: '#fff' }}>
                        <FontAwesomeIcon icon={faThumbsUp} />
                    </Button>
                    <Button variant="link" onClick={() => handleComment(bet.id)} style={{ textDecoration: 'none', color: '#fff' }}>
                        <FontAwesomeIcon icon={faComment} />
                    </Button>
                    <Button variant="link" onClick={() => handleShare(bet.id)} style={{ textDecoration: 'none', color: '#fff' }}>
                        <FontAwesomeIcon icon={faShare} />
                    </Button>
                </div>
            </Card.Footer>
        </Card>
    );
};

export default BetCard;
