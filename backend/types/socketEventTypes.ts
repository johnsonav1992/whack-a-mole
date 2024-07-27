export type ClientToServerEvents = {
    'player-signed-in': SignInEvent;
    'mole-whacked': WhackEvent;
    'player-whack-attempt': WhackEvent;
};

export type ServerToClientEvents = {
    'player-signed-in': SignInEvent;
    'mole-whacked': WhackEvent;
    'player-whack-attempt': WhackEvent;
};

type WhackEvent = ( params: { moleIndex: number; playerId: number } ) => void;
type SignInEvent = ( params: { playerUsername: string } ) => void;
