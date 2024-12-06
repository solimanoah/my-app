import React, { useState } from 'react';
import styles from './Login.module.css';
import { Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError('Both fields must be entered')
            return;
        }

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                window.location.href = '/books';
            } else {
                setError(data.message || 'Invalid email or password');
            }
        } catch (err) {
            setError('Error connecting to the server. Please try again');
        }
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.header}>BOOK GALORE! &#128218;</h1>
            <h2 className={styles.subHeader}>LOG IN</h2>
            <form className={styles.form} onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={styles.input}
                />
                <input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={styles.input}
                />
                {error && <p className={styles.error}>{error}</p>}
                <button type="submit" className={styles.button}>Log in</button>
                <p className={styles.redirect}>
                    <Link to="/" className={styles["redirect-link"]}>Don't have an account?</Link>
                </p>
            </form>
        </div>
    )
};

export default Login;