import {
    Stack
    , Typography
} from '@mui/material';
import Board from './components/Board/Board';
import { useState } from 'react';
import ScoreBoard from './components/ScoreBoard/ScoreBoard';
import { GAME_LEVELS } from './utils/gameLevels';
import { useTimer } from './hooks/useTimer';
import { GameLevel } from './types/types';
import GameOver from './components/GameOver/GameOver';
import { useFont } from './hooks/useFont';
import whackAMoleFont from './assets/HelloWhackAMole.ttf';

function App () {
    const [ score, setScore ] = useState( 0 );
    const [ gameLevel, setGameLevel ] = useState<GameLevel>( GAME_LEVELS.child );

    useFont( 'Whack-A-Mole', whackAMoleFont );

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
        <Stack
            sx={ {
                width: '100%'
                , height: '100vh'
                , alignItems: 'center'
                , justifyContent: 'center'
                , gap: '1rem'
            } }
        >
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
        </Stack>
    );
}

export default App;
