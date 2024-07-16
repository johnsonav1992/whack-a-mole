import { PropsWithChildren } from 'react';

// MUI
import { Stack } from '@mui/material';

const ViewWrapper = ( { children }: PropsWithChildren<unknown> ) => {
    return (
        <Stack
            sx={ {
                width: '100%'
                , height: '100vh'
                , alignItems: 'center'
                , justifyContent: 'center'
                , gap: '1rem'
                , backgroundColor: theme => theme.palette.secondary.main
            } }
        >
            { children }
        </Stack>
    );
};

export default ViewWrapper;
