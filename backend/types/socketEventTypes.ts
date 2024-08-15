import { GameRoom } from "../types/types";

export type ClientToServerEvents = {
    'player-signed-in': SignInEvent;
    'mole-whacked': WhackEvent;
    'player-whack-attempt': WhackEvent;
    'join-room': JoinOrLeaveRoomEvent;
    'leave-room': JoinOrLeaveRoomEvent;
    'level-select-initiated': LevelSelectInitiatedEvent;
    'player-action': PlayerActionEvent;
};

export type ServerToClientEvents = Partial<ClientToServerEvents & {
    'load-current-players': ( params: { currentPlayers: string[] } ) => void;
    'load-current-rooms': ( params: { currentRooms: GameRoom[] } ) => void;
    'user-leave': ( params: { userName: string } ) => void;
}>;

type WhackEvent = ( params: { moleIndex: number; playerId: number } ) => void;
type SignInEvent = ( params: { playerUsername: string } ) => void;
type LevelSelectInitiatedEvent = (params: { roomName: string }) => void;

export type PlayerActionEvent = (
    params: { 
        roomName: string; 
        playerName: string; 
        actionPayload: Record<string, unknown>
    } 
) => void;
export type JoinOrLeaveRoomEvent = ( params: { room: string, userName: string } ) => void;
