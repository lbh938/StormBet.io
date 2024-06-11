import React, { useState, useEffect } from 'react';
import './App.css';
import  WebApp  from '@twa-dev/sdk';

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

    // Use fetch to make the POST request
    fetch('/api/bets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ description, amount, user }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Bet created:', data);
        WebApp.showAlert('Bet created successfully!');
        WebApp.close();
      })
      .catch((error) => {
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
