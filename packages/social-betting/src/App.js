// App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import OpenBets from './components/OpenBets';
import MatchedBets from './components/MatchedBets';
import ClosedBets from './components/ClosedBets';
import Login from './components/Login';
import Register from './components/Register';
import HomePage from './components/HomePage'; // Import the HomePage component
import Wallet from './components/Wallet'; // Import the HomePage component

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* Set the HomePage as the root path */}
        <Route path="/open-bets" element={<OpenBets />} /> {/* Adjust other routes accordingly */}
        <Route path="/matched-bets" element={<MatchedBets />} />
        <Route path="/closed-bets" element={<ClosedBets />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/wallet" element={<Wallet />} />
      </Routes>
    </Router>
  );
};

export default App;
