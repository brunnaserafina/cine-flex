import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from '../Footer/Footer';
import Loading from '../Loading/Loading';
import axios from "axios";
import "./style.css";



export default function ChooseSeat() {
    const { idSessao } = useParams();
    const [seat, setSeat] = useState(null);

    const subtitle = [
        { status: "Selecionado", classe: "reservado" },
        { status: "Disponível", classe: "disponivel" },
        { status: "Indisponível", classe: "indisponivel" }
    ];

    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v7/cineflex/showtimes/${idSessao}/seats`)
        promise.then(response => setSeat(response.data))
    }, []);

    console.log(seat);

    if (seat === null) {
        return (
            <Loading />
        );
    }

    return (
        <>
            <div className="select-seat">
                <h1>Selecione o(s) assento(s)</h1>
            </div>

            <div className="assentos">
                {seat.seats.map(seats => (
                    <Seats key={seats.id} {...seats} />
                ))}
            </div>
            <div className="sub">
                {subtitle.map((sub, id) => (
                    <Subtitle key={id} classe={sub.classe} status={sub.status} />
                ))}
            </div>

            <Footer {...seat.movie} />
        </>

    );
}

function Seats({ isAvailable, name }) {
    const [click, setClick] = useState(false);

    if (isAvailable === false) {
        return (
            <div className="indisponivel" onClick={() => alert("Esse assento não está disponível")}>{name}</div>
        )
    } else if (isAvailable === true && click === true) {
        return (
            <div className="reservado" onClick={() => setClick(!click)}>{name}</div>
        )
    }
    return (
        <>
            <div className="disponivel" onClick={() => setClick(!click)}>{name}</div>
        </>
    );

}

function Subtitle({ classe, status }) {
    return (
        <div className="subtitle">
            <span className={classe}></span>
            <p>{status}</p>
        </div>
    );
}

