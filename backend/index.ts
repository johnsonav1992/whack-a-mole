import { 
    Server
    , Socket
} from "socket.io";
import { 
    ClientToServerEvents
    , ServerToClientEvents 
} from './types/socketEventTypes'
import { joinRoom, leaveRoom, levelSelectInitiated, moleWhacked, playerAction, userLeave, userSignedIn } from "./socketEventHandlers/socketEventHandlers.ts";
import { getRoomsAndPlayers, registerHandlers } from "./utils/utils.ts";
import { GameRoomBoardData } from "./types/types";

const PORT = 8000;
export const activeUsers = new Map<Socket['id'], string>();
export const activeTwoPlayerGames = new Map<string, GameRoomBoardData>();

const io = new Server<
    ClientToServerEvents
    , ServerToClientEvents
>(PORT, { cors: { origin: '*' } } );

console.log("Whack-A-Mole Socket Server up and running on", PORT )

io.on( "connection", socket => {
    console.log('New socket connected:', socket.id) ;

    // Init data sent on connection of new socket
    console.log('loading current user count - ', activeUsers.size)
    socket.emit('load-current-players', { currentPlayers: Array.from(activeUsers.values()) } )

    const gameRooms = getRoomsAndPlayers();

    console.log('loading current room count - ', gameRooms.length )
    socket.emit('load-current-rooms', { currentRooms: gameRooms } )

    // Register normal handlers
    registerHandlers(socket,
        userSignedIn,
        joinRoom,
        leaveRoom,
        moleWhacked,
        userLeave,
        levelSelectInitiated,
        playerAction
    )
} );

export { io }
