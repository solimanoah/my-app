import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Checkout.module.css';
import ThankYou from '../ThankYou/ThankYou';

const Checkout = ({books}) => {
    const [basket, setBasket] = useState([]);
    const [totalCost, setTotalCost] = useState(0);
    const [billingInfo, setBillingInfo] = useState({
        name: '',
        address: '',
        postcode: '',
        phone: '',
        card: '',
    });

    const exampleJPG = require('../../assets/images/example.jpg');
    
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBasket = async () => {
            try {
                const response = await fetch('/api/basket', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                if (!response.ok) throw new Error('Failed to fetch basket');

                // set basket contents and total cost upon every component mount
                const data = await response.json();
                setBasket(data.basket);
                calculateTotal(data.basket);
            } catch (error) {
                console.error('Error fetching basket:', error)
            }
        };

        fetchBasket();
    }, []);

    const calculateTotal = (basket) => {
        const total = basket.reduce((sum, item) => sum + item.price * item.quantity, 0);
        setTotalCost(total);
    };

    const handleRemove = async (bookId) => {
        try {
            const response = await fetch(`/api/basket/${bookId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (!response.ok) throw new Error('Failed to remove item');

            // updated basket and total cost
            const updatedBasket = basket.filter((item) => item.book_id !== bookId);
            setBasket(updatedBasket);
            calculateTotal(updatedBasket);
        } catch (error) {
            console.error('Error removing item:', error);
        }
    };

    const handleInputChange = (e) => {
        setBillingInfo({ ...billingInfo, [e.target.name]: e.target.value });
    };

    const handlePayNow = async () => {
        try {
            const response = await fetch('/api/basket', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            const data = await response.json();
            // new array with only purchased titles
            const purchasedBooks = data.basket.map((item) => item.title);

            await fetch('/api/basket', {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            navigate('/thank-you', { state: { purchasedBooks } });
        } catch (error) {
            console.error('Error during checkout:', error);
        }
    };

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

                <div className={styles.basketSection}>
                    <h3>BASKET</h3>
                    <div className={styles.basketItems}>
                        {basket.map((item) => {
                            const book = books.find((b) => b.id === item.book_id)
                            
                            return (
                                <div key={item.book_id} className={styles.basketItem}>
                                  <button onClick={() => handleRemove(item.book_id)}
                                      className={styles.removeButton}>
                                      X
                                  </button>
                                  <div className="itemDetails">
                                      <img
                                          src={book.image}
                                          alt={"example"}
                                          className={styles.bookCover}
                                      />
                                      <p><strong>{item.title}</strong></p>
                                      <p><i>{item.author}</i></p>
                                      <p>${item.price}</p>
                                  </div>
                                </div>
                            )
                        })}
                    </div>
                    <h3>Total Cost: ${totalCost}</h3>
                </div>
            </div>
        </div>
    );
};

export default Checkout;