const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken');
const { addBook, getBasket, removeFromBasket, clearBasket } = require('../controllers/basketController');

// adding book to user's basket - POST
router.post('/', authenticateToken, addBook);
// retrieve all books currently in basket - GET
router.get('/', authenticateToken, getBasket);
// delete specific book from basket - DELETE
router.delete('/:bookId', authenticateToken, removeFromBasket);
// delete all books from basket after purchase
router.delete('/', authenticateToken, clearBasket);

module.exports = router;