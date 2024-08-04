// Types
import { WhackAMoleSocket } from "../types/types";

// Utils
import { activeUsers, io } from '../index'

export const userSignedIn = (socket: WhackAMoleSocket) => {
    socket.on('player-signed-in', (e) => {
        const newUser = e.playerUsername
        console.log(`${newUser} just signed in`);

        activeUsers.set(socket.id, newUser)
        console.log('Current Active Users:', Object.fromEntries(activeUsers.entries()));

        socket.emit( 'player-signed-in', { playerUsername: newUser } )
    })
}

export const joinRoom = (socket: WhackAMoleSocket) => {
    socket.on('join-room', e => {
        socket.join(e.room)
        console.log(socket.rooms)
    })
}

export const moleWhacked = (socket: WhackAMoleSocket) => {
    socket.on('mole-whacked', ev => io.emit('mole-whacked', ev))
}