// Components
import {
    Button
    , Typography
} from '@mui/material';
import ViewWrapper from '../ViewWrapper/ViewWrapper';

// Types
import { GameStep } from '../../types/types';

type Props = {
    resetGame: ( gameStep?: GameStep ) => void;
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
