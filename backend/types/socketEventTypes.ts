import { GameRoom } from "../types/types";

export type ClientToServerEvents = {
    'player-signed-in': SignInEvent;
    'mole-whacked': WhackEvent;
    'player-whack-attempt': WhackEvent;
    'join-room': JoinOrLeaveRoomEvent;
    'leave-room': JoinOrLeaveRoomEvent;
};

export type ServerToClientEvents = Partial<{
    'player-signed-in': SignInEvent;
    'load-current-players': ( params: { currentPlayers: string[] } ) => void;
    'load-current-rooms': ( params: { currentRooms: GameRoom[] } ) => void;
    'mole-whacked': WhackEvent;
    'player-whack-attempt': WhackEvent;
    'join-room': JoinOrLeaveRoomEvent;
    'leave-room': JoinOrLeaveRoomEvent;
    'user-leave': ( params: { userName: string } ) => void;
}>;

type WhackEvent = ( params: { moleIndex: number; playerId: number } ) => void;
type SignInEvent = ( params: { playerUsername: string } ) => void;
export type JoinOrLeaveRoomEvent = ( params: { room: string, userName: string } ) => void;
