import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from '../Loading/Loading';
import Seats from './Seats'
import BuyForm from './BuyForm'
import "./style.css";

export default function ChooseSeat() {
    window.scrollTo(0,0);
    
    const { idSessao } = useParams();
    const [seat, setSeat] = useState([]);
    const [seatIds, setSeatIds] = useState([]);
    const [seatsSelected, setSeatsSelected] = useState([]);
    const subtitle = [
        { status: "Selecionado", classe: "reservado" },
        { status: "Disponível", classe: "disponivel" },
        { status: "Indisponível", classe: "indisponivel" }
    ];

    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v7/cineflex/showtimes/${idSessao}/seats`);
        promise.then(response => setSeat(response.data));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (seat.length === 0) {
        return (
            <Loading />
        );
    }

    //console.log( seat);

    return (
        <>
            <div className="select-seat">
                <h1>Selecione o(s) assento(s)</h1>
            </div>

            <div className="seat-div">
                <div className="seat">
                    {seat.seats.map((item) => (
                        <Seats
                            item={item}
                            key={item.id}
                            seatIds={seatIds}
                            setSeatIds={setSeatIds}
                            seatsSelected={seatsSelected}
                            setSeatsSelected={setSeatsSelected}
                        />
                    ))}
                </div>
            </div>

            <div className="sub">
                {subtitle.map((sub, id) => (
                    <Subtitle
                        key={id}
                        classe={sub.classe}
                        status={sub.status}
                        seatIds={seatIds}
                        seatsSelected={seatsSelected}
                    />
                ))}
            </div>

            <BuyForm
                {...seat}
                seatIds={seatIds}
                seatsSelected={seatsSelected}
            />

            <div className="footer">
                <img src={seat.movie.posterURL} alt="posterURL"/>
                <div>
                    <h3>{seat.movie.title}</h3>
                    <h3>{seat.day.weekday} - {seat.name}</h3>
                </div>

            </div>
        </>

    );
}

function Subtitle({ 
    classe, 
    status 
}) {
    return (
        <div className="subtitle">
            <span className={classe}></span>
            <p>{status}</p>
        </div>
    );
}

