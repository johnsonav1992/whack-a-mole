import { GameLevel } from '../types/types';

export const GAME_LEVELS: Record<GameLevel['level'], GameLevel> = {
    child: {
        level: 'child'
        , moleUpTime: 4000
        , moleUpFrequency: 2500
    }
    , easy: {
        level: 'easy'
        , moleUpTime: 2500
        , moleUpFrequency: 1500
    }
    , medium: {
        level: 'medium'
        , moleUpTime: 2000
        , moleUpFrequency: 1250
    }
    , hard: {
        level: 'hard'
        , moleUpTime: 1000
        , moleUpFrequency: 1000
    }
};