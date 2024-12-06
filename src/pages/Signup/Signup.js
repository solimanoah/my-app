import React, { useState } from 'react';
import './Signup.css';
import { Link } from 'react-router-dom';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // handle signup form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!email || !password || !confirmPassword) {
            setError('Please fill in all fields');
            return;
        }
        if (password != confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        // signup
        try {
            const signupResponse = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (!signupResponse.ok) {
                const data = await signupResponse.json();
                setError(data.message || 'Something went wrong during signup');
                return;
            }

            // automatic login - assuming successful signup
            const loginResponse = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (loginResponse.ok) {
                const data = await loginResponse.json();
                localStorage.setItem('token', data.token);

                // redirected to /books
                setSuccess('Account created successfully! Redirecting...');
                window.location.href = '/books';
            } else {
                const data = await loginResponse.json();
                setError(data.message || 'Something went wrong during login')
            }
        } catch (err) {
            setError('Error connecting to the server');
        }
    };

    // mock handlers for google/facebook
    const handleGoogleSignup = () => {
        window.location.href = '/auth/google';
    };

    const handleFacebookSignup = () => {
        window.location.href = '/auth/facebook';
    };

    return (
        <div className="container">
            <h1 className="header">BOOK GALORE! &#128218;</h1>
            <h2 className="subHeader">SIGN UP</h2>
            <form onSubmit={handleSubmit} className="form">
                <input
                    type="email"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input"
                />
                <input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input"
                />
                <input
                    type="password"
                    placeholder="confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="input"
                />
                {error && <p className="error">{error}</p>}
                {success && <p className="success">{success}</p>}
                <button type="submit" className="button">
                    Sign Up
                </button>
                <p className="redirect">
                    <Link to="/login" className="redirect-link">Already have an account?</Link>
                </p>
            </form>
        </div>
    );
};

export default Signup;