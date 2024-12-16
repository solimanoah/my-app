import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './BookList.module.css';
  
const BookList = ({books}) => {
    const [genreFilter, setGenreFilter] = useState('');
    const [authorFilter, setAuthorFilter] = useState('');
    const [maxPrice, setMaxPrice] = useState(50);
    const [buttonState, setButtonState] = useState('Empty Basket');
    const navigate = useNavigate();

    // retrieving and implementing tokens for third party auth
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');

        if (token) {
            try {
                console.log("Token Retrieved from URL:", token);
                localStorage.setItem('token', token);
                navigate('/books', { replace: true });
            } catch (error) {
                console.error("Error handling token:", error);
                navigate('/login');
            } 
        } else {
            const storedToken = localStorage.getItem('token');
            if (!storedToken) {
                console.error("No token found, redirecting to /login");
                navigate('/login');
            }
        }
    }, [navigate]);

    // new array for filtered books
    const filteredBooks = books.filter((book) => {
        const matchesGenre = genreFilter ? book.genre === genreFilter : true;
        const matchesAuthor = authorFilter ? book.author === authorFilter : true;
        const matchesPrice = book.price <= maxPrice;

        return matchesGenre && matchesAuthor && matchesPrice;
    });

    const handleBookClick = (bookId) => {
        navigate(`/books/${bookId}`);
    };

    const handleEmptyBasket = async () => {

        await fetch('/api/basket', {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });

        setButtonState('✅');
        setTimeout(() => {
            setButtonState('Empty Basket')
        }, 3000);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }

    return (
        <div className={styles["booklist-container"]}>
            {/* Filters */}
            <div className={styles.filters}>
                <h3>Genre</h3>
                <select onChange={(e) => setGenreFilter(e.target.value)} value={genreFilter}>
                    <option value="">All</option>
                    <option value="Fiction">Fiction</option>
                    <option value="Mystery">Mystery</option>
                    <option value="Fantasy">Fantasy</option>
                    <option value="Romance">Romance</option>
                    <option value="Non-Fiction">Non-Fiction</option>
                </select>

                <h3>Top Authors</h3>
                <select onChange={(e) => setAuthorFilter(e.target.value)} value={authorFilter}>
                    <option value="">All</option>
                    <option value="J.K Rowling">J.K Rowling</option>
                    <option value="Agatha Christie">Agatha Christie</option>
                    <option value="Stephen King">Stephen King</option>
                </select>

                <h3>Max Price</h3>
                <input
                    type="range"
                    min="0"
                    max="50"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                />
                <p>Up to ${maxPrice}</p>
                <div className={styles.otherButtons}>
                  <button onClick={handleEmptyBasket} className={styles.emptyButton}>
                    {buttonState}
                  </button>
                  <button onClick={handleLogout} className={styles.logoutButton}>
                    Log Out
                  </button>  
                </div>  
            </div>

            {/* Book List */}
            <div className={styles.books}>
                {filteredBooks.map((book) => (
                    <div
                        key={book.id}
                        className={styles["book-card"]}
                        onClick={() => handleBookClick(book.id)}>
                        <div className={styles["book-cover"]}>
                            <img
                                src={book.image}
                                alt={book.title}
                                className={styles["book-image"]}/>
                        </div>
                        <div className={styles["book-info"]}>
                            <h4>{book.title}</h4>
                            <p>{book.genre}</p>
                            <p><i>{book.author}</i></p>
                            <p>${book.price}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BookList;