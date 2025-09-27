import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [inputText, setInputText] = useState('');
  const [message, setMessage] = useState('');
  const [fileContent, setFileContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3002/save-text', {
        text: inputText
      });
      setMessage(response.data.message);
      setInputText('');
    } catch (error) {
      setMessage('Error saving text: ' + error.message);
    }
  };

  const handleGetText = async () => {
    try {
      const response = await axios.get('http://localhost:3002/get-text');
      if (response.data.status === 'success') {
        setFileContent(response.data.content || 'File is empty');
      } else {
        setFileContent('Error: ' + response.data.message);
      }
    } catch (error) {
      setFileContent('Error fetching text: ' + error.message);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Frontend 2.0</h1>
      
      {/* Форма для отправки текста */}
      <div style={{ marginBottom: '30px' }}>
        <h2>Send Text to Backend</h2>
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
        {message && <p style={{ marginTop: '10px' }}>Status: {message}</p>}
      </div>

      {/* Кнопка для получения текста */}
      <div>
        <h2>Get Text from Backend</h2>
        <button 
          onClick={handleGetText}
          style={{ padding: '10px 20px', marginBottom: '10px' }}
        >
          Get Text
        </button>
        {fileContent && (
          <div style={{ 
            marginTop: '10px', 
            padding: '10px', 
            border: '1px solid #ccc',
            backgroundColor: '#f9f9f9',
            whiteSpace: 'pre-wrap'
          }}>
            <strong>File content:</strong><br/>
            {fileContent}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;