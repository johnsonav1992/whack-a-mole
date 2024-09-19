import { GameRoom, Players } from "../types/types";
import { activeTwoPlayerGames, activeUsers, io } from "../index";
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

        roomSockets.forEach(socketId => {
            if (activeUsers.has(socketId) && roomPlayers.length < 2) {
                roomPlayers.push(activeUsers.get(socketId) || null);
            }
        });

        while (roomPlayers.length < 2) {
            roomPlayers.push(null);
        }

        populatedGameRooms.push({ name: room, currentPlayers: roomPlayers as Players });
    });

    return populatedGameRooms;
};


export const createNewGame = (roomId: string, players: string[] ) => {
    const moleState = Array(16).fill(false);
    activeTwoPlayerGames.set(roomId, { moles: moleState, players });
};

export const playGame = (socket: WhackAMoleSocket) => {
  // Periodically pop up moles
  setInterval(() => {
    const moleToPop = Math.floor(Math.random() * moles.length);
    moles[moleToPop] = true;
    io.emit('molePop', { moleIndex: moleToPop, isVisible: true });

    setTimeout(() => {
        moles[moleToPop] = false;
        io.emit('molePop', { moleIndex: moleToPop, isVisible: false });
    }, 1000); // Mole stays up for 1 second
}, 2000); // Pop a mole every 2 seconds
}