// MUI
import { createTheme } from '@mui/material';

export const backgroundGreen = '#7df438';
export const backgroundLightBrown = '#D3B683';
export const textBrown = '#5C4033';

export const theme = createTheme( {
    palette: {
        primary: {
            main: backgroundGreen
        }
        , secondary: {
            main: backgroundLightBrown
        }
        , text: {
            primary: textBrown
        }
    }
} );
