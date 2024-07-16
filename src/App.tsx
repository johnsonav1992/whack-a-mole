import { useState } from 'react';

// MUI
import {
    Stack
    , Typography
} from '@mui/material';

// Components
import Board from './components/Board/Board';
import ScoreBoard from './components/ScoreBoard/ScoreBoard';
import GameOver from './components/GameOver/GameOver';

// Utils
import { GAME_LEVELS } from './utils/gameLevels';

// Hooks
import { useTimer } from './hooks/useTimer';
import { useFont } from './hooks/useFont';

// Types
import { GameLevel } from './types/types';

// Assets
import whackAMoleFont from './assets/HelloWhackAMole.ttf';
import GameStart from './components/GameStart/GameStart';
import ViewWrapper from './components/ViewWrapper/ViewWrapper';

function App () {
    const [ score, setScore ] = useState( 0 );
    const [ gameLevel, setGameLevel ] = useState<GameLevel | null>( GAME_LEVELS.child );

    useFont( 'Whack-A-Mole', whackAMoleFont );

    if ( !gameLevel ) {
        return (
            <GameStart />
        );
    }

    const {
        remainingTime
        , setRemainingTime
    } = useTimer( { gameDuration: gameLevel.gameDuration } );

    const resetGame = () => {
        setRemainingTime( gameLevel.gameDuration );
        setScore( 0 );
    };

    if ( !remainingTime ) {
        return (
            <GameOver
                score={ score }
                resetGame={ resetGame }
            />
        );
    }

    return (
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
                    gameLevel={ gameLevel }
                />
            </Stack>
        </ViewWrapper>
    );
}

export default App;
