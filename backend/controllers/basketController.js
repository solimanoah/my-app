const { addBookToBasket, getBasketItems, deleteBasketItem, deleteAllItems } = require('../models/basketModel');

const addBook = async (req, res) => {
    const { bookId } = req.body;
    const customerId = req.user.id;

    console.log('Received bookId:', bookId, 'Customer ID:', customerId); //debug

    try {
        const basketItem = await addBookToBasket(customerId, bookId, 1);

        res.status(201).json({ success: true, basketItem });
    } catch (error) {
        console.error('Error adding to basket:', error);
        res.status(500).json({ success: false, message: 'Failed to add to basket' });
    };
};

const getBasket = async (req, res) => {
    try {
        const customerId = req.user.id;
        const basket = await getBasketItems(customerId);
        res.status(200).json({ basket });
    } catch (error) {
        console.error('Error fetching basket:', error);
        res.status(500).json({ error: 'Failed to fetch basket' });
    }
};

const removeFromBasket = async (req, res) => {
    try {
        const { bookId } = req.params;
        const customerId = req.user.id;
        await deleteBasketItem(customerId, bookId);
        res.status(200).json({ message: 'Item removed successfully' });
    } catch (error) {
        console.error('Error removing item from basket:', error);
        res.status(500).json({ error: 'Failed to remove item' });
    }
};

const clearBasket = async (req, res) => {
    try {
        const customerId = req.user.id;
        await deleteAllItems(customerId);
        res.status(200).json({ success: true, message: 'Basket cleared successfully' });
    } catch (error) {
        console.error('Error clearing basket', error);
        res.status(500).json({ success: false, message: 'Failed to clear basket' });
    }
};

module.exports = { addBook, getBasket, removeFromBasket, clearBasket };