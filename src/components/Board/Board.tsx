import { Card } from '@mui/material';
import { backgroundGreen } from '../../theme/theme';
import mole from '../../assets/mole-pop.png';
import hole from '../../assets/mole-hole.png';
import hammer from '../../assets/hammer.png';
import hit from '../../assets/hammer-hit.png';
import {
    Dispatch
    , SetStateAction
    , useEffect
    , useState
} from 'react';
import { GameLevel } from '../../types/types';
import { GAME_LEVELS } from '../../utils/gameLevels';

type Props = {
    setScore: Dispatch<SetStateAction<number>>;
};

const Board = ( { setScore }: Props ) => {
    const [ moles, setMoles ] = useState<boolean[]>( Array( 16 ).fill( false ) );
    const [ gameLevel, setGameLevel ] = useState<GameLevel>( GAME_LEVELS.easy );

    const [ cursor, setCursor ] = useState<'' | 'hit'>( '' );

    const hammerHit = ( idx: number, isPopped: boolean ) => {
        setCursor( 'hit' );
        setTimeout( () => setCursor( '' ), 50 );

        if ( !isPopped ) return;

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
                width: 400
                , display: 'flex'
                , flexWrap: 'wrap'
                , aspectRatio: 1
                , backgroundColor: backgroundGreen
                , padding: '.5rem'
                // , cursor: `url('${ cursor === 'hit' ? hit : hammer }') 64 32, auto`
                , cursor: `url('${ cursor === 'hit' ? hit : hammer }') 64 32, auto`
            } }
        >
            {
                moles.map( ( isPopped, i ) => (
                    <img
                        src={ isPopped ? mole : hole }
                        key={ i }
                        height={ 92 }
                        width={ 92 }
                        style={ {
                            margin: '.25rem'
                        } }
                        onClick={ () => hammerHit( i, isPopped ) }
                    />
                ) )
            }
        </Card>
    );
};

export default Board;
