import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Loading from '../Loading/Loading';
import axios from 'axios';
import "./style.css";

export default function ChooseSession() {
    window.scrollTo(0,0);
    
    const { idFilme } = useParams();
    const [time, setTime] = useState(null);

    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/movies/${idFilme}/showtimes`);
        promise.then(response => setTime(response.data));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    //console.log(time);

    if (time === null) {
        return (
            <Loading />
        );
    }

    return (
        <>
            <div className="select-time">
                <h1>Selecione o horário</h1>
            </div>
            <div>
                {time.days.map(day => (
                    <Sessions key={day.id} {...day} />
                ))}
            </div>
            <div className="footer">
                <img src={time.posterURL} alt="poster"/>
                <h3>{time.title}</h3>
            </div>
        </>
    );
}

function Sessions({ weekday, date, showtimes }) {
    return (
        <div>
            <h2 className="date">
                {weekday} - {date}
            </h2>

            <div className="hours">
                {showtimes.map(showtime => (
                    <Hours key={showtime.id} {...showtime} />
                ))}
            </div>
        </div>
    );
}

function Hours({ id, name }) {
    return (
        <Link to={`/assentos/${id}`} >
            <div className="hour">
                {name}
            </div>
        </Link>
    );
}