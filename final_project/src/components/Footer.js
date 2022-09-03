import React from 'react';
import styled from 'styled-components';
import { IconButton, Typography, Button } from '@mui/material';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import QuestionAnswerRoundedIcon from '@mui/icons-material/QuestionAnswerRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
export default function Footer() {
    return (
        <footer style={FooterCss}>
            <Button sx={ButtonCss} >
                <HomeRoundedIcon sx={IconCss} />
                <lable>홈</lable>
            </Button>
            <Button sx={ButtonCss} >
                <QuestionAnswerRoundedIcon sx={IconCss} />
                <lable>채팅</lable>
            </Button>
            <Button sx={ButtonCss} >
                <PersonRoundedIcon sx={IconCss} />
                <lable>마이페이지</lable>
            </Button>



            {/* <IconButton >
                <HomeRoundedIcon sx={iconCss} />
                <label>홈</label>
            </IconButton>
            <IconButton>
                <QuestionAnswerRoundedIcon sx={iconCss} />
            </IconButton>
            <IconButton>
                <PersonRoundedIcon sx={iconCss} />
            </IconButton> */}
        </footer >
    )
}

const FooterCss = {
    left: '0px',
    bottom: '0px',
    position: 'fixed',
    width: '100%',
    minWidth: '375',
    backgroundColor: 'orange',
    // height: '3.5em',
    padding: '0.5em 0px',
    display: 'flex',
    justifyContent: 'space-evenly'
}
const ButtonCss = {
    padding: '3em 0em',
    flexDirection: 'column',
    color: 'white',
    width: '5em',
    height: '5em',
    fontSize: '0.6em',
}

const IconCss = {
    width: '1.5em',
    height: '1.5em',
}