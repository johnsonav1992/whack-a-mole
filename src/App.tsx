import {
    Button
    , Stack
} from '@mui/material';
import Board from './components/Board/Board';
import {
    useEffect
    , useState
} from 'react';
import ScoreBoard from './components/ScoreBoard/ScoreBoard';
import { GAME_LEVELS } from './utils/gameLevels';

function App () {
    const [ score, setScore ] = useState( 0 );
    const [ remainingTime, setRemainingTime ] = useState( GAME_LEVELS.child.gameDuration );

    const resetGame = () => {
        setRemainingTime( GAME_LEVELS.child.gameDuration );
        setScore( 0 );
    };

    useEffect( () => {
        if ( !remainingTime ) return;

        const interval = setInterval( () => {
            setRemainingTime( prev => prev - 1 );
        }, 1000 );

        return () => {
            clearInterval( interval );
        };
    }, [ remainingTime ] );

    if ( remainingTime === 0 ) {
        return (
            <Stack
                sx={ {
                    width: '100%'
                    , height: '100vh'
                    , alignItems: 'center'
                    , justifyContent: 'center'
                } }
            >
                <h1>Game Over!</h1>
                <h2>Score: { score }</h2>
                <Button
                    variant='contained'
                    onClick={ () => resetGame() }
                >
                    Play Again!
                </Button>
            </Stack>
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
            />
        </Stack>
    );
}

export default App;
