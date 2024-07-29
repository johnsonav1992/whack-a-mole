// Types
import { GameSettings } from '../types/types';

// Utils
import { GAME_LEVELS } from './gameLevels';

export const defaultGameSettings: GameSettings = {
    gameLevel: GAME_LEVELS.child
    , userName: ''
    , numPlayers: 1
};
