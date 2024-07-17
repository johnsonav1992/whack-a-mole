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
import ViewWrapper from './components/ViewWrapper/ViewWrapper';
import GameStart from './components/GameStart/GameStart';

// Utils
import { GAME_LEVELS } from './utils/gameLevels';

// Hooks
import { useTimer } from './hooks/useTimer';
import { useFont } from './hooks/useFont';

// Types
import { GameLevel } from './types/types';

// Assets
import whackAMoleFont from './assets/HelloWhackAMole.ttf';

function App () {
    const [ score, setScore ] = useState( 0 );
    const [ gameLevel, _ ] = useState<GameLevel>( GAME_LEVELS.child );

    useFont( 'Whack-A-Mole', whackAMoleFont );

    const {
        remainingTime
        , setRemainingTime
    } = useTimer( { gameDuration: null } );

    const resetGame = () => {
        setRemainingTime( gameLevel.gameDuration );
        setScore( 0 );
    };

    switch ( remainingTime ) {
        case 0: return (
            <GameOver
                score={ score }
                resetGame={ resetGame }
            />
        );
        case null: return (
            <GameStart
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
