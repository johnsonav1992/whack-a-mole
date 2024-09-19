// Types
import { WhackAMoleSocket } from "../types/types";

// Utils
import { activeUsers, activeTwoPlayerGames, io } from '../index'
import { createNewGame, getRoomsAndPlayers } from "../utils/utils";

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

export const levelSelectInitiated = (socket: WhackAMoleSocket) => {
    socket.on('level-select-initiated', e => socket.to(e.roomName).emit('level-select-initiated', e))
}

export const playerAction = (socket: WhackAMoleSocket) => {
    socket.on('player-action', e => {
        const playerName = e.playerName;
        const roomName = e.roomName;
        const payload = e.actionPayload;

        const currentPopulatedRooms = getRoomsAndPlayers();
        console.log(currentPopulatedRooms);

        console.log(`Player ${playerName} - ${JSON.stringify(payload)}`);

        if ('startGame' in payload) {
            const room = currentPopulatedRooms.find(rm => rm.name === roomName);

            if (room && room.currentPlayers.length === 2) {
                createNewGame(room?.name, room.currentPlayers as string[]);
                console.log('New Game Started - ', JSON.stringify(Array.from(activeTwoPlayerGames.entries())));
            }
        }

        socket.to(e.roomName).emit('player-action', e);
    })
}