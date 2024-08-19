// Jotai
import { atom } from 'jotai';

// Utils
import { defaultGameSettings } from '../utils/gameSettings';

// Types
import {
    GameRoom
    , GameStep
} from '../types/types';

// Hooks
import { useJotaiHook } from '../hooks/useJotaiHook';
import { WhackAMoleSocket } from '../../backend/types/types';

export const scoreAtom = atom( 0 );
export const gameSettingsAtom = atom( defaultGameSettings );
export const gameStepAtom = atom<GameStep>( 'players' );
export const roomsAtom = atom<GameRoom[]>( [] );
export const signedInPlayersAtom = atom<string[]>( [] );
export const socketAtom = atom<WhackAMoleSocket | null>( null );

export const useScore = useJotaiHook( scoreAtom );
export const useGameSettings = useJotaiHook( gameSettingsAtom );
export const useGameStep = useJotaiHook( gameStepAtom );
export const useRooms = useJotaiHook( roomsAtom );
export const useSignedInPlayers = useJotaiHook( signedInPlayersAtom );
export const useSocketAtom = useJotaiHook( socketAtom );
