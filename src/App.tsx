import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

const BetCreation = () => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    axios.post('/api/bets', { description, amount })
      .then(response => {
        console.log('Bet created:', response.data);
      })
      .catch(error => console.error('Error creating bet:', error));
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
            onChange={e => setDescription(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Amount (€)</label>
          <input 
            type="number" 
            value={amount} 
            onChange={e => setAmount(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Create Bet</button>
      </form>
    </div>
  );
};

export default BetCreation;
