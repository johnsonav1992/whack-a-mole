// Jotai
import { atom } from 'jotai';

// Utils
import { defaultGameSettings } from '../utils/gameSettings';

// Types
import { GameRoom } from '../types/types';

// Hooks
import { useJotaiHook } from '../hooks/useJotaiHook';

export const scoreAtom = atom( 0 );
export const gameSettingsAtom = atom( defaultGameSettings );
export const gameStepAtom = atom( 'players' );
export const roomsAtom = atom<GameRoom[]>( [] );
export const signedInPlayersAtom = atom<string[]>( [] );

export const useScore = useJotaiHook( scoreAtom );
export const useGameSettings = () => useJotaiHook( gameSettingsAtom );
export const useGameStep = () => useJotaiHook( gameStepAtom );
export const useRooms = () => useJotaiHook( roomsAtom );
export const useSignedInPlayers = () => useJotaiHook( signedInPlayersAtom );
