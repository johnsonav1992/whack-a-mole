// MUI
import {
    Button
    , Typography
} from '@mui/material';

// Types
import { ResetGameFn } from '../../types/types';

type Props = {
    score: number;
    resetGame: ResetGameFn;
};

const GameOver = ( {
    score
    , resetGame
}: Props ) => {
    return (
        <>
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
                onClick={ () => resetGame( 'players' ) }
                size='large'
            >
                Play Again!
            </Button>
        </>
    );
};

export default GameOver;
