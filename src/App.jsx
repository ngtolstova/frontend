import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [inputText, setInputText] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/save-text', {
        text: inputText
      });
      setMessage(response.data.message);
      setInputText('');
    } catch (error) {
      setMessage('Error saving text: ' + error.message);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Frontend 1.0</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter text here"
          style={{ padding: '10px', marginRight: '10px', width: '300px' }}
        />
        <button type="submit" style={{ padding: '10px 20px' }}>
          Send
        </button>
      </form>
      {message && <p style={{ marginTop: '20px' }}>Status: {message}</p>}
    </div>
  );
}

export default App;