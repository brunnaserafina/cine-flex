import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Footer from '../Footer/Footer';
import Loading from '../Loading/Loading';
import axios from 'axios';
import "./style.css";

export default function ChooseSession() {
    const { idFilme } = useParams();
    const [time, setTime] = useState(null);

    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/movies/${idFilme}/showtimes`);
        promise.then(response => setTime(response.data));
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
            <Footer {...time}/>
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