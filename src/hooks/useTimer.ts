import {
    useEffect
    , useState
} from 'react';

export type UseTimerParams = {
    gameDuration: number;
};

export const useTimer = ( { gameDuration }: UseTimerParams ) => {
    const [ remainingTime, setRemainingTime ] = useState( gameDuration );

    useEffect( () => {
        if ( !remainingTime ) return;

        const interval = setInterval( () => {
            setRemainingTime( prev => prev - 1 );
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
