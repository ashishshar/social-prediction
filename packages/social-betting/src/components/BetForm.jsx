import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import '../style/CreateBetPage.css'; // Make sure to link the CSS file
import axios from 'axios';


const CreateBetPage = ({ onSelectTab, walletBalance, onBetCreateUpdate }) => {
  const [formData, setFormData] = useState({
    maker: '',
    prediction: '',
    betAmount: ''
  });

  const token = localStorage.getItem('googleToken');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const betAmount = parseFloat(formData.betAmount);
      if (betAmount > walletBalance) {
        alert('Insufficient balance');
        return;
      }
      const updateBalance = await axios.post('https://social-test.theox.co:3030/api/transactions/accept-bet', { amount: betAmount }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (updateBalance.status === 200) {
        await axios.post('https://social-test.theox.co:3030/api/bets/create', formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        onBetCreateUpdate(true);
        onSelectTab('open');
      }else {
        alert('Insufficient balance');
        return;
      }
     
    } catch (error) {
      console.error('Error submitting bet:', error);
    }
  };

  return (
    <div className="create-bet-container">
      <h3>Create New Prediction</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="maker">
          <Form.Label>Maker *</Form.Label>
          <Form.Control
            type="text"
            name="maker"
            value={formData.maker}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="prediction">
          <Form.Label>Prediction *</Form.Label>
          <Form.Control
            type="text"
            name="prediction"
            value={formData.prediction}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="betAmount">
          <Form.Label>Bet Amount *</Form.Label>
          <Form.Control
            type="number"
            name="betAmount"
            value={formData.betAmount}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default CreateBetPage;
