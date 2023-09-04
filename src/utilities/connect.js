import io from 'socket.io-client'
import React from 'react';

// Gather user to connect to
const URL = 'http://localhost:4000'

// Connect to socket and assign to socket variable
const socket = io(URL, {
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: Infinity
})

// Export the connected Socket to be used elsewhere
export { socket }

// Export useContext (aka global state) to be used in child components
export const SocketContext = React.createContext();