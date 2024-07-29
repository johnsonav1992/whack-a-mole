// Libraries
import { Socket } from "socket.io";

// Types
import { ClientToServerEvents } from "../types/socketEventTypes";

// Utils
import { activeUsers, io } from '../index'

export const userSignedIn = (socket: Socket<ClientToServerEvents>) => {
    socket.on('player-signed-in', (e) => {
        const newUser = e.playerUsername
        console.log(`${newUser} just signed in`);

        activeUsers.set(socket.id, newUser)
        console.log('Current Active Users:', Object.fromEntries(activeUsers.entries()));
    })
}

export const moleWhacked = (socket: Socket<ClientToServerEvents>) => {
    socket.on('mole-whacked', ev => io.emit('mole-whacked', ev))
}