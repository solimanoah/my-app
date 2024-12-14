const pool = require('../database');

const addBookToBasket = async (customerId, bookId, quantity = 1) => {
    const query = `INSERT INTO basket (customer_id, book_id, quantity) VALUES ($1, $2, $3) RETURNING *`;
    const values = [customerId, bookId, quantity];

    console.log('Executing query:', query, 'with values:', values);

    const result = await pool.query(query, values);
    return result.rows[0];
};

const getBasketItems = async (customerId) => {
    const query = `
    SELECT b.book_id, b.title, b.author, b.price, basket.quantity
    FROM basket
    INNER JOIN book b ON basket.book_id = b.book_id
    WHERE basket.customer_id = $1`;

    const values = [customerId];
    const result = await pool.query(query, values);
    return result.rows;
};

const deleteBasketItem = async (customerId, bookId) => {
    const query = 'DELETE FROM BASKET WHERE customer_id = $1 AND book_id = $2';
    const values = [customerId, bookId]
    await pool.query(query, values);
};

const deleteAllItems = async (customerId) => {
    const query = 'DELETE FROM basket WHERE customer_id = $1';
    const values = [customerId];
    await pool.query(query, values);
};

module.exports = { addBookToBasket, getBasketItems, deleteBasketItem, deleteAllItems };