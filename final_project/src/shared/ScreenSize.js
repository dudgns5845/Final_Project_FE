import React from 'react';
import styled from 'styled-components';

export default function ScreenSize({ children }) {
    return <MainWrap>{children}</MainWrap>
}

const MainWrap = styled.div`
        /* background-color:red; */
        width : 100vw;
        height: 100vh;
        min-width: 375px;
        min-height:667px;
`