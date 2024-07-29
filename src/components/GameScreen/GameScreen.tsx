import {
    Stack
    , Typography
} from '@mui/material';
import ViewWrapper from '../ViewWrapper/ViewWrapper';
import ScoreBoard from '../ScoreBoard/ScoreBoard';
import Board from '../Board/Board';
import {
    Dispatch
    , SetStateAction
} from 'react';
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
            <ViewWrapper>
                <Typography
                    fontFamily='Whack-A-Mole'
                    variant='h1'
                >
                    Whack-A-Mole!
                </Typography>
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
            </ViewWrapper>
        )
    );
};

export default GameScreen;
