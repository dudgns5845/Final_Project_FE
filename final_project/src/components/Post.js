import React from 'react';
import { Card, Box, CardContent, Typography, IconButton, CardMedia, CardActionArea } from '@mui/material';
export default function Post({ test }) {

    return (
        <CardActionArea onClick={() => alert(test)}>
            <div style={CardCss}>
                <img style={ImageCss} src='https://picsum.photos/200' />
                <div style={TextCss}>
                    <h3>Post_Title</h3>
                    <p>Post_location * Post_Time</p>
                    <p>Post_Category</p>
                </div>
            </div>
            {/* <Card sx={CardCss}>
                <CardMedia
                    component="img"
                    sx={{ width: '8em', height: '8em', borderRadius: '0.5em' }}
                    image="https://picsum.photos/200"
                    alt="Live from space album cover"
                />
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography component="div" variant="h6">
                            전공책 치킨 기프티콘과 교환하실 분~~asdfasdfasdfsadfjklasdmlskmsdlkmslkdmflsakmdflskmdflamsldkfmslakdmflsakmdflkmslkm
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                            Mac Miller
                        </Typography>
                    </CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                        <IconButton aria-label="previous">
                            {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
                        </IconButton>
                        <IconButton aria-label="play/pause">
                            <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                        </IconButton>
                        <IconButton aria-label="next">
                            {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
                        </IconButton>
                    </Box>
                </Box>
            </Card> */}
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
