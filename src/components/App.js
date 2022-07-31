import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Header/Header';
import ChooseMovie from './ChooseMovie/ChooseMovie';
import './assets/css/reset.css';

export default function App() {
    return (
        <>
            <Header />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<ChooseMovie />}></Route> 
                    <Route path="/sessoes/:idFilme" element={<ChooseMovie />}></Route> //Rota horários sessões
                </Routes>
            </BrowserRouter>
        </>

    );
}