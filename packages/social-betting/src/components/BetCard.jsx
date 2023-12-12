import React, { useState } from 'react';
import { Card, Button, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faComment, faShare } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Comments from './Comments';

const BetCard = ({ bet, status, walletBalance, onBetAccepted }) => {
    const [likes, setLikes] = useState(bet.likes?.length ?? 0);
    const [shares, setShares] = useState(bet.shares ?? 0);
    const [comments, setComments] = useState(bet.comments || []);
    const [commentText, setCommentText] = useState('');
    const [showCommentsModal, setShowCommentsModal] = useState(false);
    const token = localStorage.getItem('googleToken');

    const handleAcceptBet = async (betId) => {
        if (walletBalance >= bet.betAmount) {
            try {
                const updateBalance = await axios.post('https://social-test.theox.co:3030/api/transactions/accept-bet', { amount: bet.betAmount });
                if (updateBalance.status === 200) {
                    const response = await axios.put(`https://social-test.theox.co:3030/api/bets/accept/${betId}`);
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

    const handleLike = async () => {
        try {
            const response = await axios.post(`https://social-test.theox.co:3030/api/bets/like/${bet.id}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setLikes(response.data.likes);
        } catch (error) {
            console.error('Error liking bet:', error);
        }
    };

    const handleShare = async () => {
        try {
            const response = await axios.post(`https://social-test.theox.co:3030/api/bets/share/${bet._id}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                setShares(response.data.shares);
                const shareableLink = `#${bet._id}`; // Modify this to include more details if needed
                alert('Share this bet: ' + window.location.origin + shareableLink);
            } else {
                throw new Error('Error sharing bet');
            }
        } catch (error) {
            console.error('Error sharing bet:', error);
        }
    };

    const handleComment = async (text) => {
        try {
            const response = await axios.post(`https://social-test.theox.co:3030/api/bets/comment/${bet._id}`, { text: text }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setComments(response.data);
            setCommentText('');
            console.log(commentText);
        } catch (error) {
            console.error('Error commenting:', error);
        }
    };

    const toggleCommentsModal = () => {
        setShowCommentsModal(!showCommentsModal);
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
                        <Button variant="link" style={{ color: '#fff' }} onClick={() => handleAcceptBet(bet._id)}>
                            Accept
                        </Button>
                    )}
                    <Button variant="link" onClick={handleLike} style={{ color: '#fff', textDecoration: 'none' }}>
                        <FontAwesomeIcon icon={faThumbsUp} /> {likes}
                    </Button>
                    <Button variant="link" onClick={toggleCommentsModal} style={{ color: '#fff', textDecoration: 'none' }}>
                        <FontAwesomeIcon icon={faComment} /> {comments.length}
                    </Button>
                    <Button variant="link" onClick={handleShare} style={{ color: '#fff', textDecoration: 'none' }}>
                        <FontAwesomeIcon icon={faShare} /> {shares}
                    </Button>
                </div>
            </Card.Footer>
            {/* Comment Modal */}
            <Modal show={showCommentsModal} onHide={toggleCommentsModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <div>
                            <strong>Prediction:</strong> {bet.prediction}
                        </div>
                        <div>
                            Maker: {bet.maker} <br />
                            Bet Amount: {bet.betAmount} <br />
                            Winning Amount: {bet.winningAmount}
                        </div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Comments component */}
                    <Comments comments={comments} onComment={handleComment} />
                </Modal.Body>
            </Modal>
        </Card>
    );
};

export default BetCard;
