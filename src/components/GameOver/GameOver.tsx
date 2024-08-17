// MUI
import {
    Button
    , Typography
} from '@mui/material';

// Types
import { ResetGameFn } from '../../types/types';
import { useScore } from '../../state/atoms';

type Props = {
    resetGame: ResetGameFn;
};

const GameOver = ( {
    resetGame
}: Props ) => {
    const score = useScore( 'value' );

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
                onClick={ () => resetGame( 'level' ) }
                size='large'
            >
                Play Again!
            </Button>
        </>
    );
};

export default GameOver;
