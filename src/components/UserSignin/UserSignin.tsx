import {
    ChangeEvent
    , Dispatch
    , SetStateAction
    , useCallback
} from 'react';

// MUI
import {
    Button
    , FormControlLabel
    , Radio
    , RadioGroup
    , TextField
    , Typography
} from '@mui/material';

// Components
import ViewWrapper from '../ViewWrapper/ViewWrapper';

import { debounce } from 'lodash';

// Types
import {
    GameSettings
    , GameStep
} from '../../types/types';

type Props = {
    numPlayers: number;
    gameSettings: GameSettings;
    setGameSettings: Dispatch<SetStateAction<GameSettings>>;
    setGameStep: Dispatch<SetStateAction<GameStep>>;
};

const UserSignin = ( {
    numPlayers
    , gameSettings
    , setGameSettings
    , setGameStep
}: Props ) => {
    const buttonDisabled = !gameSettings.gameLevel && !gameSettings.userName;

    const updateUsername = useCallback( debounce( ( e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => setGameSettings( settings => ( {
        ...settings
        , userName: e.target.value
    } ) ), 500 ), [] );

    return (
        <ViewWrapper>
            <Typography
                fontFamily='Whack-A-Mole'
                variant='h1'
            >
                Whack-A-Mole!
            </Typography>
            <Typography>
                Please Choose Your Username
            </Typography>
            <TextField
                onChange={ e => updateUsername( e ) }
                value={ gameSettings.userName }
            />
            <Typography>
                Please Choose Number of Players
            </Typography>
            <RadioGroup
                value={ numPlayers }
                onChange={
                    e => setGameSettings( settings => ( {
                        ...settings
                        , numPlayers: Number( e.target.value )
                    } ) )
                }
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
                disabled={ buttonDisabled }
            >
                Select
            </Button>
        </ViewWrapper>
    );
};

export default UserSignin;
