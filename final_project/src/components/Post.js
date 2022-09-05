import React from 'react';
import { Card, Box, CardContent, Typography, IconButton, CardMedia, CardActionArea } from '@mui/material';
export default function Post({ test }) {

    return (
        <CardActionArea onClick={() => alert(test)}>
            <div style={CardCss}>
                <img style={ImageCss} src='https://picsum.photos/200' />
                <div style={TextCss}>
                    <h3>Post_Title {test}</h3>
                    <p>Post_location * Post_Time</p>
                    <p>Post_Category</p>
                </div>
            </div>
        </CardActionArea>
    );
}

const CardCss = {
    display: 'flex',
    width: '100%',
    height: '8em',
    padding: '1em',
    borderTop: '1px solid gray',
    display: 'flex',
    alignItems: 'center'
}
const TextCss = {
    paddingLeft: '2em',
    width: '100%',
}
const ImageCss = {
    width: '7em',
    height: '7em',
    borderRadius: '0.5em'
}
