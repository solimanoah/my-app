const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const basketRoutes = require('./routes/basketRoutes');
const pool = require('./database');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

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