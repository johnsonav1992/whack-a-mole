import {
    ClientToServerEvents
    , ServerToClientEvents
} from '../../backend/types/socketEventTypes';
import { useSocket } from '../hooks/useSocket';

export type Mole = {
    image: `${ string }mole-${ 'hole' | 'pop' }.png`;
    isPopped: boolean;
};

export type GameLevel = {
    level: 'child' | 'easy' | 'medium' | 'hard';
    /**
     * In seconds
     */
    gameDuration: number;
    /**
     * How long is a single mole popped up
     */
    moleUpTime: number;
    /**
     * frequency between new moles popping up
     */
    moleUpFrequencyBase: number;
    /**
     * potential additional ms range to add
     */
    moleUpFrequencyUpper: number;
    /**
     * potential ms range to subtract
     */
    moleUpFrequencyLower: number;
};

export type GameStep = 'players' | 'level' | 'start' | 'active' | 'waiting' | 'finished';

export type GameSettings = {
    numPlayers: number;
    gameLevel: GameLevel | null;
    userName: string;
};

export type ResetGameFn = ( gameStep?: GameStep ) => void;

export type Players = [string | null, string | null];
export type GameRoom = {
    name: string;
    currentPlayers: Players;
};

export type UseSocketRegisterEvent = ReturnType<typeof useSocket<ServerToClientEvents, ClientToServerEvents>>['registerEvent'];
