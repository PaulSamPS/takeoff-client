import { io } from 'socket.io-client';

const URL = 'ws://localhost:4000';
export const socket = io(URL, { transports: ['websocket'] });
