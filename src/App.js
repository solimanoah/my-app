import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// import pages
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import BookList from './pages/BookList';
import BookDetails from './pages/BookDetails';
import Checkout from './pages/Checkout';
import ThankYou from './pages/ThankYou';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Signup />} />

        {/* Protected Routes */}
        <Route path="/books" element={<div>BookList coming soon</div>} />
        <Route path="/books/:bookId" element={<div>BookDetails coming soon</div>} />
        <Route path="/checkout" element={<div>Checkout coming soon</div>} />
        <Route path="/thank-you" element={<div>ThankYou coming soon</div>} />
      </Routes>
    </Router>
  );
}

export default App;
