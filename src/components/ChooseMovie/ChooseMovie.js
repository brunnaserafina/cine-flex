import React from "react";
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';
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
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        const promise = axios.get("https://mock-api.driven.com.br/api/v7/cineflex/movies");
        promise.then((movie) => { setMovie(movie.data) });
    }, []);

    //console.log(movie);

    if (movie === null) {
        return (
            <Loading />
        );
    }

    return (
        <div className="movies">
            {movie.map(movie => (
                <Movie key={movie.id} {...movie} />
            ))}
        </div>
    );
}

function Movie({ id, posterURL }) {
    return (
        <Link to={`/sessoes/${id}`}>
                <img src={posterURL} />
        </Link>
    );
}