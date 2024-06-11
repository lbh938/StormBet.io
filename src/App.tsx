import React, { useState, useEffect } from 'react';
import './App.css';
import WebApp from '@twa-dev/sdk';
import axios, { AxiosResponse, AxiosError } from 'axios';

const BetCreation: React.FC = () => {
  const [description, setDescription] = useState<string>('');
  const [amount, setAmount] = useState<string>('');

  useEffect(() => {
    // Initialize the Telegram WebApp
    WebApp.ready();
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Retrieve user information from the WebApp
    const user = WebApp.initDataUnsafe.user;

    if (!user) {
      console.error('User information is not available.');
      return;
    }

    // Use axios to make the POST request
    axios.post('/api/bets', { description, amount, user })
      .then((response: AxiosResponse) => {
        console.log('Bet created:', response.data);
        WebApp.showAlert('Bet created successfully!');
        WebApp.close();
      })
      .catch((error: AxiosError) => {
        console.error('Error creating bet:', error);
        WebApp.showAlert('Error creating bet.');
        WebApp.close();
      });
  };

  return (
    <div>
      <h2>Create a Bet</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Description</label>
          <input 
            type="text" 
            value={description} 
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Amount (€)</label>
          <input 
            type="number" 
            value={amount} 
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAmount(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Create Bet</button>
      </form>
    </div>
  );
};

export default BetCreation;
