import React from "react";
import ScreenSize from "../shared/ScreenSize";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Post from "../components/Post";
const test = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
export default function MainPage() {
    return (
        <>
            <Header />
            <div style={{ marginTop: '5em' }}>
                {test.map((t, idx) => {
                    return <Post test={t} key={idx}></Post>
                })}
            </div>
            <Footer />
        </>)
}