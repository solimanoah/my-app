import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './BookDetails.module.css';

const BookDetails = ({books, addToBasket}) => {
    const { bookId } = useParams();
    const navigate = useNavigate();

    const [buttonState, setButtonState] = useState('Add to Basket')

    // find book
    const book = books.find((b) => b.id === parseInt(bookId));

    if (!book) {
        return <p>Book not found</p>;
    }

    const handleBuyNow = () => {
        navigate('/checkout-single', { state: { singleBook: book } });
    };

    const handleAddToBasket = () => {
        console.log('Adding book to basket:', book.id); // debug code
        addToBasket(book);
        setButtonState('✅');
        setTimeout(() => {
            setButtonState('Add to Basket');
        }, 3000);
    };

    const handleCheckout = () => {
        navigate('/checkout');
    };

    return (
        <div className={styles.container}>
            <button onClick={() => navigate(-1)} className={styles.backButton}>
            ← Back
            </button>
            <div className={styles.content}>
                <div className={styles.imageContainer}>
                    <img src={book.image} alt={book.title} className={styles.bookImage}/>
                </div>
                <div className={styles.details}>
                    <h1>{book.title}</h1>
                    <h3>By {book.author}</h3>
                    <p>{book.genre}</p>
                    <p className={styles.description}><strong>Description:</strong> {book.description}</p>
                    <h2>${book.price}</h2>
                    <div className={styles.buttons}>
                        <div className={styles.bothButtons}>
                          <button onClick={handleBuyNow} className={styles.buyNow}>
                              Buy Now
                            </button>
                            <button onClick={handleAddToBasket} className={styles.addToBasket}>
                              {buttonState}
                            </button>
                        </div>
                        <button onClick={handleCheckout} className={styles.checkout}>
                            Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookDetails;


