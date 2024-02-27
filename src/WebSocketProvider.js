/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
// WebSocketContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

const WebSocketContext = createContext();

export const WebSocketProvider = ({ children }) => {
  const [client, setClient] = useState(null);

  useEffect(() => {
    const newClient = new W3CWebSocket('ws://localhost:5000');

    newClient.onopen = () => {
      console.log('WebSocket Client Connected');
    };

    newClient.onmessage = (message) => {
      console.log(`Received message: ${message.data}`);
      toast.info(`${message.data}`);
    };

    newClient.onclose = () => {
      console.log('WebSocket Client Closed');
    };

    setClient(newClient);

    return () => {
      if (newClient) {
        newClient.close();
      }
    };
  }, []);

  return (
    <WebSocketContext.Provider value={{ client }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  return useContext(WebSocketContext);
};
