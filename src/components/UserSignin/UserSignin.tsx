// MUI
import {
    Button
    , FormControlLabel
    , Radio
    , RadioGroup
    , TextField
    , Typography
} from '@mui/material';

// Hooks
import {
    useGameSettings
    , useGameStep
    , useRooms
    , useSocketAtom
} from '../../state/atoms';

type Props = {
    numPlayers: number;
};

const UserSignin = ( {
    numPlayers
}: Props ) => {
    const socket = useSocketAtom( 'value' );
    const rooms = useRooms( 'value' );
    const gameSettings = useGameSettings( 'value' );
    const setGameSettings = useGameSettings( 'set' );
    const setGameStep = useGameStep( 'set' );

    const usernameNotSelected = !gameSettings.userName;
    const isDuplicateUsername
        = rooms.some( room => room.currentPlayers.some( player => player === gameSettings.userName ) )
        && gameSettings.numPlayers === 2;

    const buttonDisabled = usernameNotSelected || isDuplicateUsername;

    const continueToNext = () => {
        if ( gameSettings.numPlayers === 2 ) {
            setGameStep( 'waiting' );
        } else {
            setGameStep( 'level' );
        }

        socket?.emit(
            'player-signed-in'
            , { playerUsername: gameSettings.userName }
        );
    };

    return (
        <>
            <Typography>
                Please Choose Your Username
            </Typography>
            <TextField
                InputProps={ { sx: { backgroundColor: 'white' } } }
                size='small'
                onChange={ e => setGameSettings( settings => ( {
                    ...settings
                    , userName: e.target.value
                } ) ) }
                value={ gameSettings.userName }
                error={ isDuplicateUsername }
                helperText={ isDuplicateUsername && 'Username already taken' }
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
                row
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
                onClick={ continueToNext }
                disabled={ buttonDisabled }
            >
                Continue
            </Button>
        </>
    );
};

export default UserSignin;
