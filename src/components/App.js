import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Header/Header';
import ChooseMovie from './ChooseMovie/ChooseMovie';
import ChooseSession from './ChooseSession/ChooseSession';
import './assets/css/reset.css';
import './assets/css/style.css';

export default function App() {
    return (
        <>
            <Header />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<ChooseMovie />}></Route> 
                    <Route path="/sessoes/:idFilme" element={<ChooseSession />}></Route> 
                </Routes>
            </BrowserRouter>
        </>

    );
}