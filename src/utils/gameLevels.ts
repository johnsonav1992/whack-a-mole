import { GameLevel } from '../types/types';

export const GAME_LEVELS: Record<GameLevel['level'], GameLevel> = {
    child: {
        level: 'child'
        , gameDuration: 60
        , moleUpTime: 4000
        , moleUpFrequency: 2500
    }
    , easy: {
        level: 'easy'
        , gameDuration: 45
        , moleUpTime: 2500
        , moleUpFrequency: 1500
    }
    , medium: {
        level: 'medium'
        , gameDuration: 30
        , moleUpTime: 2000
        , moleUpFrequency: 1250
    }
    , hard: {
        level: 'hard'
        , gameDuration: 25
        , moleUpTime: 1000
        , moleUpFrequency: 1000
    }
};
