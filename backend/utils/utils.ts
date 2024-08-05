import { GameRoom, Players } from "../types/types";
import { activeUsers, io } from "../index";
import { WhackAMoleSocket } from "../types/types";

export const registerHandlers = <TSocket extends WhackAMoleSocket>(
    socket: TSocket
    , ...handlers: ((socket: TSocket) => void)[]
) => handlers.forEach(handler => handler(socket));

export const getRoomsAndPlayers = () => {
    const rooms = Array.from(io.sockets.adapter.rooms.keys());
    const gameRooms = rooms.filter(room => !io.sockets.adapter.sids.get(room));
    const populatedGameRooms: GameRoom[] = [];
    
    gameRooms.forEach(room => {
        const roomSockets = Array.from(io.sockets.adapter.rooms.get(room) || []);
        const roomPlayers: Array<string | null> = [];

        let roomIsFull = roomPlayers.length === 2

        roomSockets.forEach(socketId => {
            if (activeUsers.has(socketId) && !roomIsFull) {
                roomPlayers.push(activeUsers.get(socketId) || null);
            }
        });

        if (!roomIsFull) roomPlayers.push(null);

        populatedGameRooms.push({ name: room, currentPlayers: roomPlayers as Players });
    });

    return populatedGameRooms;
}