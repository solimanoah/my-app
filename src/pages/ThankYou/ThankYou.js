import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './ThankYou.module.css';

const ThankYou = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const purchasedBooks = location.state?.purchasedBooks || [];

    return (
        <div className={styles.thankYouContainer}>
            <h1>THANKS FOR YOUR PURCHASE OF... &#127881;</h1>
            <div className={styles.purchasedBooks}>
                {purchasedBooks.map((title, index) => (
                    <p key={index}>{title}</p>
                ))}
            </div>
            <button onClick={() => navigate('/books')} className={styles.backToBrowsing}>
                Back to Browsing
            </button>
        </div>
    );
};

export default ThankYou;