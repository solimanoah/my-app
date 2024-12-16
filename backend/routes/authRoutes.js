const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/authController');
const passport = require('../passportConfig');

// signup POST
router.post('/signup', signup);

// login POST
router.post('/login', login);

// google info access - login/signup
router.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

// google info authentication and access token
router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        try {
            const token = generateJWT(req.user);
            if (!token) throw new Error("Token generation failed");
            console.log("Generated Token", token);
            res.redirect(`http://localhost:3000/books?token=${encodeURIComponent(token)}`);
        } catch (error) {
            console.error("Error in Google callback:", error);
            res.redirect('/login');
        }
    }
);

// facebook info access = login/signup
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));

// facebook info authentication and access token
router.get('/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    (req, res) => {
        try {
            const token = generateJWT(req.user);
            if (!token) throw new Error("Token generation failed");
            console.log("Generated Token", token);
            res.redirect(`http://localhost:3000/books?token=${encodeURIComponent(token)}`);
        } catch (error) {
            console.error("Error in Facebook callback:", error);
            res.redirect('/login');
        }
    }
);

function generateJWT(user) {
    const jwt = require('jsonwebtoken');
    return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1hr' });
}

module.exports = router;