import { 
    Server
    , Socket
} from "socket.io";
import { 
    ClientToServerEvents
    , ServerToClientEvents 
} from './types/socketEventTypes.js'
import { joinRoom, moleWhacked, userSignedIn } from "./socketEventHandlers/socketEventHandlers.ts";
import { registerHandlers } from "./utils/utils.ts";

const PORT = 8000;
export const activeUsers = new Map<Socket['id'], string>();

const io = new Server<
    ClientToServerEvents
    , ServerToClientEvents
>(PORT, { cors: { origin: '*' } } );

console.log("Whack-A-Mole Socket Server up and running on", PORT )

io.on( "connection", socket => {
    console.log('New socket connected:', socket.id) ;

    registerHandlers(socket,
        userSignedIn,
        joinRoom,
        moleWhacked
    )
} );

export { io }
