import React from "react";
import styled from "styled-components";
import { IconButton, AppBar, Toolbar, MenuItem, Menu, Button } from '@mui/material';
import TableRowsRoundedIcon from '@mui/icons-material/TableRowsRounded';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import { useNavigate } from "react-router-dom";

import { useState } from "react";
export default function Header() {

    const navigate = useNavigate();

    const [menuOpen, setMenuOpen] = useState(null);
    const open = Boolean(menuOpen);
    const handleClick = (event) => {
        setMenuOpen(event.currentTarget);
    };
    const handleClose = () => {
        setMenuOpen(null);
    };


    return (
        <AppBar>
            <Toolbar sx={AppCss}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <LocationOnRoundedIcon />
                    <span>영등포구</span>
                    Z       </div>
                {/* <Button
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    sx={{ color: 'white' }}
                >
                    <LocationOnRoundedIcon />
                    영등포구
                </Button> */}
                {/* <Menu
                    id="basic-menu"
                    anchorEl={menuOpen}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    {guList.map((item, idx) => {
                        return <MenuItem key={idx} onClick={handleClose}>{item}</MenuItem>
                    })}
                </Menu> */}
                <div>
                    <IconButton onClick={() => { navigate('/searchpage') }}>
                        <SearchRoundedIcon />
                    </IconButton>
                    <IconButton onClick={() => { navigate('/postpage') }}>
                        <CreateRoundedIcon />
                    </IconButton>
                    <IconButton>
                        <NotificationsRoundedIcon />
                    </IconButton>
                </div>
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

const guList = ['강남구', '강동구', '강북구', '강서구', '관악구', '광진구', '구로구', '금천구', '노원구', '도봉구', '동대문구', '동작구', '마포구', '서대문구', '서초구', '성동구', '성북구', '송파구', '양천구', '영등포구', '용산구', '은평구', '종로구', '중구', '중랑구']