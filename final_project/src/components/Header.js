import React from "react";
import { AppBar, Toolbar } from '@mui/material';

export default function Header({ children }) {

    return (
        <AppBar>
            <Toolbar sx={AppCss}>
                {children}
            </Toolbar>
        </AppBar >
    )
}
const AppCss = {
    backgroundColor: 'red',
    position: 'fixed',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    '*': {
        color: 'white'
    },
    'div': {
        padding: '0 2em'
    }
}

