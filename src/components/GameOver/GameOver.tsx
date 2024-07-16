import {
    Button
    , Stack
} from '@mui/material';

export type Props = {
    score: number;
    resetGame: () => void;
};

const GameOver = ( {
    score
    , resetGame
}: Props ) => {
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
};

export default GameOver;
