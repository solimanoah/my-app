const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const basketRoutes = require('./routes/basketRoutes');
const pool = require('./database');
const passport = require('./passportConfig');
const session = require('express-session');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    })
);
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    res.send('Welcome to the Book Galore API')
});

app.use('/api/auth', authRoutes);
app.use('/api/basket', basketRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
    try {
        await pool.query('SELECT NOW()');
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
    console.log(`Server running on http://localhost:${PORT}`);
});