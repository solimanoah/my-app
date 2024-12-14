import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './CheckoutSingle.module.css';

const CheckoutSingle = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const book = location.state?.singleBook;

    const [billingInfo, setBillingInfo] = useState({
        name: '',
        address: '',
        postcode: '',
        phone: '',
        card: '',
    });

    const handleInputChange = (e) => {
        setBillingInfo({ ...billingInfo, [e.target.name]: e.target.value });
    };

    const handlePayNow = () => {
        navigate('/thank-you-single', { state: { purchasedBook: book } });
    };

    if (!book) {
        return <p>No Book selected. Go back to browse books.</p>
    }

    return (
        <div className={styles.container}>
            <button onClick={() => navigate(-1)} className={styles.backButton}>
            ← Back
            </button>
            <h1 className={styles.header}>BOOK GALORE! &#128218;</h1>
            <h2 className={styles.subHeader}>CHECKOUT</h2>
            <div className={styles.checkoutPage}>
                <div className={styles.billingSection}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={billingInfo.name}
                        onChange={handleInputChange}
                        className={styles.input}
                    />
                    <input
                        type="text"
                        name="address"
                        placeholder="Street Address"
                        value={billingInfo.address}
                        onChange={handleInputChange}
                        className={styles.input}
                    />
                    <input
                        type="text"
                        name="postcode"
                        placeholder="Post Code"
                        value={billingInfo.postcode}
                        onChange={handleInputChange}
                        className={styles.input}
                    />
                    <input
                        type="text"
                        name="phone"
                        placeholder="Phone Number"
                        value={billingInfo.phone}
                        onChange={handleInputChange}
                        className={styles.input}
                    />
                    <input
                        type="text"
                        name="card"
                        placeholder="Debit Card Number"
                        value={billingInfo.card}
                        onChange={handleInputChange}
                        className={styles.input}
                    />
                    <button onClick={handlePayNow} className={styles.payNowButton}>
                        Pay Now
                    </button>
                </div>
                <div className={styles.bookSection}>
                    <div className={styles.BookDetails}>
                      <img src={book.image} alt={book.title} className={styles.bookCover} />
                      <h4><strong>{book.title}</strong></h4>
                      <p><i>{book.author}</i></p>
                      <h3 className={styles.totalCost}>Total Cost: ${book.price}</h3>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default CheckoutSingle;