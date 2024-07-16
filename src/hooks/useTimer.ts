import {
    useEffect
    , useState
} from 'react';

export type UseTimerParams = {
    gameDuration: number | null;
};

export const useTimer = ( { gameDuration }: UseTimerParams ) => {
    const [ remainingTime, setRemainingTime ] = useState<number | null>( gameDuration );

    useEffect( () => {
        if ( !remainingTime ) return;

        const interval = setInterval( () => {
            setRemainingTime( prev => prev! - 1 );
        }, 1000 );

        return () => {
            clearInterval( interval );
        };
    }, [ remainingTime ] );

    return {
        remainingTime
        , setRemainingTime
    };
};
