'use client';

import React, { useState } from 'react';

const LoginForm = () => {
  // State to store form input values.
  const [email, setEmail] = useState('admin@gmail.com');
  const [password, setPassword] = useState('admin12345');
  const [businessType, setBusinessType] = useState('SUBHI_E_LTD');
  
  // State for handling loading and error messages.
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Submit handler for the login form.
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Create the payload.
    const payload = {
      email,
      password,
      businessType,
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok && data.statusCode === 200) {
        // Store the accessToken in local storage.
        localStorage.setItem('accessToken', data.data.accessToken);
        console.log('Login successful:', data.message);
        // Optionally, redirect the user or update the UI.
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      console.error('Error during login:', err);
      setError('An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-form-container" style={{ maxWidth: '400px', margin: '0 auto' }}>
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        {/* Email Input */}
        <div className="form-group" style={{ marginBottom: '1rem' }}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>

        {/* Password Input */}
        <div className="form-group" style={{ marginBottom: '1rem' }}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>

        {/* Business Type Input */}
        <div className="form-group" style={{ marginBottom: '1rem' }}>
          <label htmlFor="businessType">Business Type</label>
          <input
            id="businessType"
            type="text"
            value={businessType}
            onChange={(e) => setBusinessType(e.target.value)}
            placeholder="Enter business type"
            required
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>

        {/* Submit Button */}
        <button type="submit" disabled={loading} style={{ padding: '0.5rem 1rem' }}>
          {loading ? 'Logging in...' : 'Login'}
        </button>

        {/* Error Message */}
        {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
      </form>
    </div>
  );
};

export default LoginForm;
