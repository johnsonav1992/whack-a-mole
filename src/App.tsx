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
import UserSignin from './components/UserSignin/UserSignin';

// Utils
import { GAME_LEVELS } from './utils/gameLevels';

// Hooks
import { useTimer } from './hooks/useTimer';
import { useFont } from './hooks/useFont';

// Types
import {
    GameLevel
    , GameStep
} from './types/types';

// Assets
import whackAMoleFont from './assets/HelloWhackAMole.ttf';

function App () {
    const [ score, setScore ] = useState( 0 );
    const [ gameLevel, _ ] = useState<GameLevel>( GAME_LEVELS.child );
    const [ numPlayers, setNumPlayers ] = useState( 1 );
    const [ gameStep, setGameStep ] = useState<GameStep>( 'players' );

    console.log( numPlayers );

    useFont( 'Whack-A-Mole', whackAMoleFont );

    const {
        remainingTime
        , setRemainingTime
    } = useTimer( { gameDuration: null } );

    const resetGame = () => {
        setRemainingTime( gameLevel.gameDuration );
        setScore( 0 );
    };

    const renderView = () => {
        switch ( gameStep ) {
            case 'players': return (
                <UserSignin
                    numPlayers={ numPlayers }
                    setNumPlayers={ setNumPlayers }
                    setGameStep={ setGameStep }
                />
            );
            case 'start': return (
                <GameStart
                    resetGame={ resetGame }
                />
            );
            case 'finished': return (
                <GameOver
                    score={ score }
                    resetGame={ resetGame }
                />
            );
            case 'active':
                return remainingTime && (
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
    };

    return renderView();

}

export default App;
