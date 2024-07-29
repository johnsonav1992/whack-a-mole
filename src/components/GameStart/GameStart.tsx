// MUI
import {
    Button
    , Typography
} from '@mui/material';

// Components
import ViewWrapper from '../ViewWrapper/ViewWrapper';

// Types
import { ResetGameFn } from '../../types/types';

type Props = {
    resetGame: ResetGameFn;
};

const GameStart = ( { resetGame }: Props ) => {
    return (
        <ViewWrapper sx={ { gap: '2rem' } }>
            <Typography
                fontFamily='Whack-A-Mole'
                variant='h1'
            >
                Whack-A-Mole!
            </Typography>
            <Button
                variant='contained'
                onClick={ () => resetGame( 'active' ) }
                size='large'
            >
                Lets Play!
            </Button>
        </ViewWrapper>
    );
};

export default GameStart;
