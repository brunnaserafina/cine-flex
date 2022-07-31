import React from "react";
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "./style.css";


export default function ChooseMovie() {
    return (
        <>
            <div className="select-movie">
                <h1>Selecione o filme</h1>
            </div>
            <Movies />
        </>

    );
}

function Movies() {
    const [movie, setMovie] = useState([]);

    useEffect(() => {
        const promise = axios.get("https://mock-api.driven.com.br/api/v7/cineflex/movies");

        promise.then((movie) => { setMovie(movie.data) });

    }, []);


    return (
        <div className="container-movies">
            {movie.map(movie => (
                <Movie key={movie.id} movie={movie} />
            ))}
        </div>
    );
}

function Movie({ movie }) {
    return (
        <Link to={`/sessoes/${movie.id}`}>
                <img src={movie.posterURL} />
        </Link>
    )
}