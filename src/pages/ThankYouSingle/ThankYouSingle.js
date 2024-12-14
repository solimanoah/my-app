import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './ThankYouSingle.module.css';

const ThankYouSingle = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const purchasedBook = location.state?.purchasedBook;

    if (!purchasedBook) {
        return <p>No purchase found. Go back to browse books.</p>
    }

    return (
        <div className={styles.thankYouContainer}>
            <h1>THANKS FOR YOUR PURCHASE OF... &#127881;</h1>
            <div className={styles.purchasedBook}>
                <h2><strong>{purchasedBook.title}</strong></h2>
                <h3><i>By {purchasedBook.author}</i></h3>
            </div>
            <button className={styles.backToBrowsing} onClick={() => navigate('/books')}>Back to Browsing</button>
        </div>
    );
};

export default ThankYouSingle;