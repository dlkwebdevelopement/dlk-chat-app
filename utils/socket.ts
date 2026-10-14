import { io, Socket } from 'socket.io-client';
import { API_URL } from './api';

const SOCKET_URL = API_URL.replace('/api', '');

let socket: Socket | null = null;

export const initializeSocket = (userId: string) => {
  if (socket) {
    socket.disconnect();
  }

  socket = io(SOCKET_URL, {
    query: { userId }
  });

  socket.on('connect', () => {
    console.log('Socket connected');
  });

  socket.on('disconnect', () => {
    console.log('Socket disconnected');
  });

  return socket;
};

export const getSocket = () => socket;