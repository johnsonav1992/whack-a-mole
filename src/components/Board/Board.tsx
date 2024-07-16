import {
    Dispatch
    , ElementRef
    , SetStateAction
    , useEffect
    , useRef
    , useState
} from 'react';

// MUI
import { Card } from '@mui/material';

// Components
import Mole from '../Mole/Mole';
import WhackSound from '../WhackSound/WhackSound';

// Theme
import { backgroundGreen } from '../../theme/theme';

// Assets
import hammer from '../../assets/hammer.png';
import hit from '../../assets/hammer-hit.png';

// Types
import { GameLevel } from '../../types/types';

type Props = {
    setScore: Dispatch<SetStateAction<number>>;
    remainingTime: number;
    gameLevel: GameLevel;
};

const Board = ( {
    setScore
    , remainingTime
    , gameLevel
}: Props ) => {
    const [ moles, setMoles ] = useState<boolean[]>( Array( 16 ).fill( false ) );
    const [ cursor, setCursor ] = useState<'' | 'hit'>( '' );

    const whackSoundRef = useRef<ElementRef<'audio'>>( null );

    const hammerHit = ( idx: number, isPopped: boolean ) => {
        setCursor( 'hit' );
        setTimeout( () => setCursor( '' ), 50 );

        if ( !isPopped ) return;

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
        if ( !remainingTime ) return;

        const interval = setInterval( () => {
            const moleToPop = Math.floor( Math.random() * moles.length );
            toggleMole( moleToPop, true );

            setTimeout( () => {
                toggleMole( moleToPop, false );
            }, gameLevel.moleUpTime );
        }, gameLevel.moleUpFrequency );

        return () => {
            clearInterval( interval );
        };
    }, [] );

    return (
        <Card
            elevation={ 4 }
            sx={ {
                width: 500
                , display: 'flex'
                , justifyContent: 'space-between'
                , gap: '.5rem'
                , flexWrap: 'wrap'
                , aspectRatio: 1
                , backgroundColor: backgroundGreen
                , padding: '1.5rem'
                , cursor: `url('${ cursor === 'hit' ? hit : hammer }') 64 32, auto`
            } }
        >
            {
                moles.map( ( isPopped, i ) => (
                    <Mole
                        key={ i }
                        moleIndex={ i }
                        isPopped={ isPopped }
                        hammerHit={ hammerHit }
                    />
                ) )
            }
            <WhackSound audioRef={ whackSoundRef } />
        </Card>
    );
};

export default Board;
