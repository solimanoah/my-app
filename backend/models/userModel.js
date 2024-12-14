const db = require('../database');

// sign up
exports.createUser = async (email, password) => {
    try {
        const query = 'INSERT INTO customer (email, password) VALUES ($1, $2) RETURNING *';
        const values = [email, password];

        console.log('Executing query on:', query); // debug log

        const result = await db.query(query, values);

        return result.rows[0];
    } catch (error) {
        console.error('Error creating user:', error);
        throw new Error('Failed to create user');
    }
};

// checking existence of email already
exports.findByEmail = async (email) => {
    try {
        const query = 'SELECT * FROM customer WHERE email = $1';
        const values = [email];

        const result = await db.query(query, values);

        return result.rows[0] || null;
    } catch (error) {
        console.error('Error finding user by email:', error);
        throw new Error('Failed to find user by email');
    }
};

// check email and password against database for login
exports.verifyUser = async (email, password) => {
    try {
        const query = 'SELECT * FROM customer WHERE email = $1 AND PASSWORD = $2';
        const values = [email, password];

        const result = await db.query(query, values);

        return result.rows[0] || null;
    } catch (error) {
        console.error('Error verifying user:', error);
        throw new Error('Failed to verify user');
    }
};