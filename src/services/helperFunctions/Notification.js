/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/button-has-type */
/// ReminderForm.js
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

const ReminderForm = () => {
  const [reminderText, setReminderText] = useState('');
  const [client, setClient] = useState(null);

  useEffect(() => {
    const newClient = new W3CWebSocket('ws://localhost:5000');

    newClient.onopen = () => {
      console.log('WebSocket Client Connected');
    };

    newClient.onmessage = (message) => {
      console.log(`Received message: ${message.data}`);
      toast.info(`Received message: ${message.data}`);
    };

    newClient.onclose = () => {
      console.log('WebSocket Client Closed');
    };

    // Set the new client in the state
    setClient(newClient);

    // Clean up the WebSocket connection when the component is unmounted
    return () => {
      if (newClient) {
        newClient.close();
      }
    };
  }, []); // Empty dependency array ensures the effect runs only once during component mount

  const handleSendReminder = () => {
    if (client && client.readyState === client.OPEN) {
      client.send(reminderText);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={reminderText}
        onChange={(e) => setReminderText(e.target.value)}
      />
      <button onClick={handleSendReminder}>Send Reminder</button>
    </div>
  );
};

export default ReminderForm;
