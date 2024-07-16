// Types
import { GameLevel } from '../types/types';

export const GAME_LEVELS: Record<GameLevel['level'], GameLevel> = {
    child: {
        level: 'child'
        , gameDuration: 60
        , moleUpTime: 4000
        , moleUpFrequencyBase: 2500
        , moleUpFrequencyUpper: 250
        , moleUpFrequencyLower: 2000
    }
    , easy: {
        level: 'easy'
        , gameDuration: 45
        , moleUpTime: 2500
        , moleUpFrequencyBase: 1500
        , moleUpFrequencyUpper: 400
        , moleUpFrequencyLower: 1000
    }
    , medium: {
        level: 'medium'
        , gameDuration: 30
        , moleUpTime: 2000
        , moleUpFrequencyBase: 1250
        , moleUpFrequencyUpper: 300
        , moleUpFrequencyLower: 800
    }
    , hard: {
        level: 'hard'
        , gameDuration: 25
        , moleUpTime: 1000
        , moleUpFrequencyBase: 1000
        , moleUpFrequencyUpper: 200
        , moleUpFrequencyLower: 650
    }
};
