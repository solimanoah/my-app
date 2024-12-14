const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    const { email, password } = req.body;
    console.log('Request Body:', req.body); //debug log

    try {
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        // check if user with email already exists; no duplicates
        const existingUser = await userModel.findByEmail(email);
        console.log('Existing User:', existingUser); // debug log
        if (existingUser) {
            return res.status(400).json({ error: 'Email already in use' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // create new user to store in db
        const newUser = await userModel.createUser(email, hashedPassword);
        console.log('New User Created:', newUser); // debug log

        return res.status(201).json({
            message: 'Account created successfully',
            user: { id: newUser.id, email: newUser.email },
        });
    } catch (error) {
        console.error('Error in signup:', error);
        return res.status(500).json({ error: 'Failed to create account' });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        // no user existing means impossible log in with given email
        const user = await userModel.findByEmail(email);
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // given password is compared with hash
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // jwt session token
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: '1hr',
        });

        return res.status(200).json({
            message: 'Login successful',
            token,
            user: { id: user.id, email: user.email },
        });
    } catch (error) {
        console.error('Error in login:', error);
        return res.status(500).json({ error: 'Failed to log in' });
    }
};