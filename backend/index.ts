import { 
    Server
    , Socket
} from "socket.io";
import { 
    ClientToServerEvents
    , ServerToClientEvents 
} from './types/socketEventTypes.js'
import { moleWhacked, userSignedIn } from "./socketEventHandlers/socketEventHandlers.ts";

const PORT = 8000;
export const activeUsers = new Map<Socket['id'], string>();

const io = new Server<
    ClientToServerEvents
    , ServerToClientEvents
>(PORT, { cors: { origin: '*' } } );

console.log("Whack-A-Mole Socket Server up and running on", PORT )

io.on( "connection", socket => {
    console.log('New socket connected:', socket.id) ;

    // Register Handlers
    userSignedIn(socket);
    moleWhacked(socket);
} );

export { io }
