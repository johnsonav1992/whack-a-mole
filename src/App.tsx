import { Stack } from '@mui/material';
import Board from './components/Board/Board';
import { useState } from 'react';
import ScoreBoard from './components/ScoreBoard/ScoreBoard';
import { GAME_LEVELS } from './utils/gameLevels';
import { useTimer } from './hooks/useTimer';
import { GameLevel } from './types/types';
import GameOver from './components/GameOver/GameOver';

function App () {
    const [ score, setScore ] = useState( 0 );
    const [ gameLevel, setGameLevel ] = useState<GameLevel>( GAME_LEVELS.child );

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
            } }
        >
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
    );
}

export default App;
