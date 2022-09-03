import React, { useState } from "react";
import ScreenSize from "../shared/ScreenSize";
import { Link, useNavigate } from "react-router-dom"

export default function MainPage() {
    const navigate = useNavigate()
    const [register, setRegister] = useState(true)
    const onRegister = () => {
        navigate('/login', )
    }
    navigate('/login', {})
    return (
        <ScreenSize>
            <h1>메인페이지</h1>
            <Link to="/login">로그인 및 회원가입</Link>
        </ScreenSize>)
}