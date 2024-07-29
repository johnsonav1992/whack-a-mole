// MUI
import { Button } from '@mui/material';

// Types
import { ResetGameFn } from '../../types/types';

type Props = {
    resetGame: ResetGameFn;
};

const GameStart = ( { resetGame }: Props ) => {
    return (
        <Button
            variant='contained'
            onClick={ () => resetGame( 'active' ) }
            size='large'
            sx={ { mt: '2rem' } }
        >
            Lets Play!
        </Button>
    );
};

export default GameStart;
