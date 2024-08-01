import {
    Dispatch
    , SetStateAction
} from 'react';

// MUI
import { Stack } from '@mui/material';

// Components
import ScoreBoard from '../ScoreBoard/ScoreBoard';
import Board from '../Board/Board';

// Types
import { GameSettings } from '../../types/types';

type Props = {
    score: number;
    setScore: Dispatch<SetStateAction<number>>;
    remainingTime: number | null;
    gameSettings: GameSettings;
};

const GameScreen = ( {
    score
    , setScore
    , remainingTime
    , gameSettings
}: Props ) => {
    return (
        remainingTime
        && gameSettings.gameLevel
        && (
            <>
                <Stack>
                    <ScoreBoard
                        score={ score }
                        remainingTime={ remainingTime }
                    />
                    <Board
                        setScore={ setScore }
                        remainingTime={ remainingTime }
                        gameLevel={ gameSettings.gameLevel }
                    />
                </Stack>
            </>
        )
    );
};

export default GameScreen;
