import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const EventSecurity = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userId, setUserId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const checkSecurity = async (email, password) => {
    try {
      setIsLoading(true);
      const response = await fetch('http://localhost/event_api/verify_security_key.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json().catch(() => {
        throw new Error('Invalid JSON response');
      });

      if (data.status === 'success') {
        setResponseData(data.message);
        localStorage.setItem('userId', data.id);
        navigate('/event_creation');
      } else {
        setError(data.message); 
      }
    } catch (error) {
      setError(`An error occurred: ${error.message}`); 
    } finally {
      setIsLoading(false); 
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrorMessage('');

    if (email.length === 0 || password.length === 0) {
      setErrorMessage('Both email and password are required.');
      return;
    }

    checkSecurity(email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-semibold text-center mb-6">Security Verification</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="text"
              id="email"
              className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="text"
              id="password"
              className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>

          {errorMessage && (
            <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
          )}

          {error && (
            <p className="text-red-500 text-sm mb-4">{error}</p>
          )}

          {responseData && (
            <p className="text-green-500 text-sm mb-4">{responseData}</p>
          )}

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className={`w-full py-2 px-4 rounded-md text-dark ${isLoading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`}
              disabled={isLoading}
            >
              {isLoading ? 'Verifying...' : 'Verify'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventSecurity;
