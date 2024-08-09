import {
    Dispatch
    , SetStateAction
} from 'react';

// Types
import { GameRoom } from '../types/types';
import { JoinOrLeaveRoomEvent } from '../../backend/types/socketEventTypes';

export const getRandomTimeWithinRange = ( baseMs: number, upper: number, lower: number ) => {
    const lowerBound = baseMs - lower;
    const upperBound = baseMs + upper;

    const randomMs = Math.floor( Math.random() * ( upperBound - lowerBound + 1 ) ) + lowerBound;

    return randomMs;
};

export const getNextMoleToPop = ( moles: boolean[] ) => {
    const moleToPop = Math.floor( Math.random() * moles.length );

    if ( moles[ moleToPop ] ) getNextMoleToPop( moles );

    return moleToPop;
};

export const playerJoin = (
    e: Parameters<JoinOrLeaveRoomEvent>[number]
    , setRooms: Dispatch<SetStateAction<GameRoom[]>>
) => {
    const roomName = e.room;
    const user = e.userName;

    setRooms( prevRooms => {
        const roomExists = prevRooms.some( room => room.name === roomName );

        if ( roomExists ) {
            return prevRooms.map( room =>
                room.name === roomName
                    ? {
                        ...room
                        , currentPlayers: [ room.currentPlayers[ 0 ], user ] as never
                    }
                    : room
            );
        } else {
            return [
                ...prevRooms
                , {
                    name: roomName
                    , currentPlayers: [ user, null ]
                }
            ];
        }
    } );
};

export const playerLeave = (
    user: string,
    setRooms: Dispatch<SetStateAction<GameRoom[]>>
) => {
    setRooms( prevRooms => {
        const roomUserIsIn = prevRooms.find( rm => rm.currentPlayers.includes( user ) );

        if ( roomUserIsIn ) {
            const updatedPlayers = roomUserIsIn.currentPlayers.filter( player => player !== user );

            const updatedRooms = prevRooms.map( roomItem =>
                roomItem.name === roomUserIsIn.name
                    ? {
                        ...roomItem
                        , currentPlayers: updatedPlayers.length > 0
                            ? [ ...updatedPlayers, null ]
                            : [ null, null ]
                    } as GameRoom
                    : roomItem
            );

            return updatedRooms.filter( room =>
                !room.currentPlayers.every( player => player === null )
            );
        }

        return prevRooms;
    } );
};
