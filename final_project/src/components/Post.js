import React from 'react';
import { CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';
export default function Post({ postid }) {
    const naviage = useNavigate();
    return (
        <CardActionArea onClick={() => naviage(`detail/${postid}`)}>
            <div style={CardCss}>
                <img style={ImageCss} src='https://picsum.photos/200' />
                <div style={TextCss}>
                    <h3>Post_Title {postid}</h3>
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
