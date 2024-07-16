// MUI
import {
    Button
    , Stack
    , Typography
} from '@mui/material';

type Props = {
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
                , gap: '1rem'
            } }
        >
            <Typography
                variant='h1'
                fontFamily='Whack-A-Mole'
            >
                Game Over!
            </Typography>
            <Typography variant='h3'>
                Score: { score }
            </Typography>
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
