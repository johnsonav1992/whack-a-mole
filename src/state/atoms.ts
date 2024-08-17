// Jotai
import {
    atom
    , useAtom
} from 'jotai';

// Utils
import { defaultGameSettings } from '../utils/gameSettings';

// Types
import { GameRoom } from '../types/types';

export const scoreAtom = atom( 0 );
export const gameSettingsAtom = atom( defaultGameSettings );
export const gameStepAtom = atom( 'players' );
export const roomsAtom = atom<GameRoom[]>( [] );
export const signedInPlayersAtom = atom<string[]>( [] );

export const useScore = useAtom( scoreAtom );
export const useGameSettings = useAtom( gameSettingsAtom );
export const useGameStep = useAtom( gameStepAtom );
export const useRooms = useAtom( roomsAtom );
export const useSignedInPlayers = useAtom( signedInPlayersAtom );
