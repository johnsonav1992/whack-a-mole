import {
    Atom
    , SetStateAction
    , useAtom
    , useAtomValue
    , useSetAtom
} from 'jotai';

type SetAtom<Args extends unknown[], Result> = ( ...args: Args ) => Result;
type UseAtomReturn<Value> = [Awaited<Value>, SetAtom<[SetStateAction<Value>], void>];

export const useJotaiHook = <T> ( atom: Atom<T> ) => {
    return <Type extends 'set' | 'value' | 'norm'>( type: Type ) => {
        if ( type === 'set' ) {
            return useSetAtom( atom as never ) as Type extends 'set' ? SetAtom<[SetStateAction<T>], void>: never;
        }

        if ( type === 'value' ) {
            return useAtomValue( atom ) as Type extends 'value' ? T : never;
        }

        return useAtom( atom ) as unknown as Type extends 'norm' ? UseAtomReturn<T> : never;
    };
};
