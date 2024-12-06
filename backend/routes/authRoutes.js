const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/authController');

// signup POST
router.post('/signup', signup);

// login POST
router.post('/login', login);

module.exports = router;