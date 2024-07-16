import { useEffect } from 'react';

export const useFont = ( fontName: string, fontUrl: string ) => {
    useEffect( () => {
        const font = new FontFace( fontName, `url(${ fontUrl })` );

        font.load().then( loadedFont => {
            document.fonts.add( loadedFont );
        } ).catch( error => {
            console.error( 'Error loading font:', error );
        } );
    }, [] );
};
