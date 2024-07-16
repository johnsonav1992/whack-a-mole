import { PropsWithChildren } from 'react';

// MUI
import {
    Stack
    , StackProps
} from '@mui/material';

const ViewWrapper = ( {
    children
    , sx
    , ...stackProps
}: PropsWithChildren<StackProps> ) => {
    return (
        <Stack
            sx={ {
                width: '100%'
                , height: '100vh'
                , alignItems: 'center'
                , justifyContent: 'center'
                , gap: '1rem'
                , backgroundColor: theme => theme.palette.secondary.main
                , ...sx
            } }
            { ...stackProps }
        >
            { children }
        </Stack>
    );
};

export default ViewWrapper;
