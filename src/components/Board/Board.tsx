import {
    ElementRef
    , useEffect
    , useRef
    , useState
} from 'react';

// MUI
import {
    Box
    , Card
} from '@mui/material';

// Components
import Mole from '../Mole/Mole';
import WhackSound from '../WhackSound/WhackSound';

// Assets
import hammerUp from '../../assets/hammer.png';
import hammerHit from '../../assets/hammer-hit.png';

// Types
import { GameLevel } from '../../types/types';
import {
    getNextMoleToPop
    , getRandomTimeWithinRange
} from '../../utils/utils';

// Hooks
import { useScore } from '../../state/atoms';

type Props = {
    remainingTime: number;
    gameLevel: GameLevel;
};

const Board = ( {
    remainingTime
    , gameLevel
}: Props ) => {
    const setScore = useScore( 'set' );
    const [ moles, setMoles ] = useState<boolean[]>( Array( 16 ).fill( false ) );
    const [ cursor, setCursor ] = useState<'up' | 'whack'>( 'up' );

    const boardRef = useRef<ElementRef<typeof Card>>( null );
    const whackSoundRef = useRef<ElementRef<'audio'>>( null );

    const whack = ( idx: number, isPopped: boolean ) => {
        setCursor( 'whack' );
        setTimeout( () => setCursor( 'up' ), 50 );

        if ( !isPopped ) return;

        // pause current sound execution to prep for the next one
        whackSoundRef?.current?.pause();
        whackSoundRef!.current!.currentTime = 0;

        whackSoundRef?.current?.play();

        toggleMole( idx, false );
        setScore( currScore => currScore + 1 );
    };

    const toggleMole = ( idx: number, isVisible: boolean ) => {
        setMoles( currentMoles => {
            const newMoles = [ ...currentMoles ];
            newMoles[ idx ] = isVisible;

            return newMoles;
        } );
    };

    useEffect( () => {
        boardRef.current?.addEventListener( 'contextmenu', e => e.preventDefault() );
    }, [] );

    useEffect( () => {
        if ( !remainingTime ) return;

        const moleUpFreq = getRandomTimeWithinRange(
            gameLevel.moleUpFrequencyBase
            , gameLevel.moleUpFrequencyUpper
            , gameLevel.moleUpFrequencyLower
        );

        const timeoutId = setTimeout( () => {
            const moleToPop = getNextMoleToPop( moles );
            toggleMole( moleToPop, true );

            setTimeout( () => {
                toggleMole( moleToPop, false );
            }, gameLevel.moleUpTime );
        }, moleUpFreq );

        return () => {
            clearTimeout( timeoutId );
        };
    }, [ moles ] );

    return (
        <Box ref={ boardRef }>
            <Card
                elevation={ 4 }
                sx={ {
                    width: 500
                    , display: 'flex'
                    , justifyContent: 'space-between'
                    , gap: '.5rem'
                    , flexWrap: 'wrap'
                    , aspectRatio: 1
                    , backgroundColor: theme => theme.palette.primary.main
                    , padding: '1.5rem'
                    , cursor: `url('${ cursor === 'whack' ? hammerHit : hammerUp }') 64 32, auto`
                } }
            >
                {
                    moles.map( ( isPopped, i ) => (
                        <Mole
                            key={ i }
                            moleIndex={ i }
                            isPopped={ isPopped }
                            hammerHit={ whack }
                        />
                    ) )
                }
                <WhackSound audioRef={ whackSoundRef } />
            </Card>
        </Box>
    );
};

export default Board;
