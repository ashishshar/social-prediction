import React, { useContext } from 'react';
import { Navbar, Nav } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faWallet } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from './AuthContext'; 

const FooterNavbar = ({ activeTab, onSelectTab }) => {
    const authContext = useContext(AuthContext);

    const handleAddBetClick = () => {
        // if (!authContext || !authContext.isAuthenticated) {
        //   alert('Please login to access Add Bet.');
        // } else {
          onSelectTab('addBet');
        // }
      };
    
      const handleWalletClick = () => {
        // if (!authContext || !authContext.isAuthenticated) {
        //   alert('Please login to access Wallet.');
        // } else {
          onSelectTab('wallet');
        // }
      };
  
    return (
        <Navbar bg="dark" variant="dark" fixed="bottom" style={{ borderTop: '1px solid #666' }}>
            <Nav className="w-100 justify-content-around text-center">
                <Nav.Item>
                    <Nav.Link active={activeTab === 'open'} onClick={() => onSelectTab('open')}>Open</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link active={activeTab === 'matched'} onClick={() => onSelectTab('matched')}>Matched</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link active={activeTab === 'closed'} onClick={() => onSelectTab('closed')}>Closed</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link active={activeTab === 'addBet'} onClick={handleAddBetClick}><FontAwesomeIcon icon={faPlus} /></Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link active={activeTab === 'wallet'} onClick={handleWalletClick}><FontAwesomeIcon icon={faWallet} /></Nav.Link>
                </Nav.Item>
            </Nav>
        </Navbar>
    );
};


export default FooterNavbar;