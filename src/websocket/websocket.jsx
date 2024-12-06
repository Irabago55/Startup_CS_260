import React, { useState, useEffect } from 'react';
import './websocket.css';

export function WebSocketChat() {
  const [socket, setSocket] = useState(null);
  const [name, setName] = useState('');
  const [inputName, setInputName] = useState('');
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:5001'); // Adjust to your server's WebSocket URL
    setSocket(ws);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'message') {
        setChatMessages((prevMessages) => [...prevMessages, `${data.name}: ${data.message}`]);
      }
    };

    return () => ws.close();
  }, []);

  const handleNameSubmit = () => {
    if (socket && inputName.trim()) {
      setName(inputName.trim());
      socket.send(JSON.stringify({ type: 'setName', name: inputName.trim() }));
    }
  };

  const handleMessageSubmit = () => {
    if (socket && message.trim()) {
      socket.send(JSON.stringify({ type: 'message', message: message.trim() }));
      setMessage('');
    }
  };

  return (
    <div className="chat-container">
      {!name ? (
        <div className="name-input">
          <h2>Enter your name to join the chat</h2>
          <input
            type="text"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
            placeholder="Your Name"
          />
          <button onClick={handleNameSubmit}>Join Chat</button>
        </div>
      ) : (
        <div className="chat-room">
          <h2>Welcome, {name}!</h2>
          <div className="messages">
            {chatMessages.map((msg, index) => (
              <div key={index} className="message">
                {msg}
              </div>
            ))}
          </div>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
          />
          <button onClick={handleMessageSubmit}>Send</button>
        </div>
      )}
    </div>
  );
}
