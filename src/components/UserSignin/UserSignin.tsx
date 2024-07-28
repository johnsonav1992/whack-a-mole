import {
    Button
    , FormControlLabel
    , Radio
    , RadioGroup
    , Typography
} from '@mui/material';
import ViewWrapper from '../ViewWrapper/ViewWrapper';
import {
    Dispatch
    , SetStateAction
} from 'react';
import { GameStep } from '../../types/types';

type Props = {
    numPlayers: number;
    setNumPlayers: Dispatch<SetStateAction<number>>;
    setGameStep: Dispatch<SetStateAction<GameStep>>;
};
const UserSignin = ( {
    numPlayers
    , setNumPlayers
    , setGameStep
}: Props ) => {
    return (
        <ViewWrapper>
            <Typography
                fontFamily='Whack-A-Mole'
                variant='h1'
            >
                Whack-A-Mole!
            </Typography>
            <Typography>
                Please Choose Number of Players
            </Typography>
            <RadioGroup
                value={ numPlayers }
                onChange={ e => setNumPlayers( Number( e.target.value ) ) }
            >
                <FormControlLabel
                    label='1 Player'
                    control={ <Radio value={ 1 } /> }
                />
                <FormControlLabel
                    label='2 Player'
                    control={ <Radio value={ 2 } /> }
                />
            </RadioGroup>
            <Button
                variant='contained'
                onClick={ () => setGameStep( 'start' ) }
            >
                Select
            </Button>
        </ViewWrapper>
    );
};

export default UserSignin;
