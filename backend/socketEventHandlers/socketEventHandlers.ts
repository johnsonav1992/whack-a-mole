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

        io.emit( 'player-signed-in', { playerUsername: newUser } )
    })
}

export const joinRoom = (socket: WhackAMoleSocket) => {
    socket.on('join-room', e => {
        socket.join(e.room)
        console.log(socket.rooms)

        socket.broadcast.emit('join-room', { room: e.room, userName: e.userName })
    })
}

export const leaveRoom = (socket: WhackAMoleSocket) => {
    socket.on('leave-room', e => {
        socket.leave(e.room)
        console.log(socket.rooms)

        socket.broadcast.emit('leave-room', { room: e.room, userName: e.userName })
    })
}

export const moleWhacked = (socket: WhackAMoleSocket) => {
    socket.on('mole-whacked', ev => io.emit('mole-whacked', ev))
}

export const userLeave = (socket: WhackAMoleSocket) => {
    socket.on('disconnect', () => {
        const user = activeUsers.get(socket.id)
        console.log('User disconnected:', socket.id, user);

        activeUsers.delete(socket.id)
        console.log('Current Active Users:', Object.fromEntries(activeUsers.entries()));

        io.emit('user-leave', { userName: user as string })
    })
}