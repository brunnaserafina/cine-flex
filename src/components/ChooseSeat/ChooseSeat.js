import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from '../Loading/Loading';
import Buy from './Buy'
import "./style.css";

export default function ChooseSeat() {
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
    }, []);

    if (seat.length === 0) {
        return (
            <Loading />
        );
    }

    console.log("seat é", seat);

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

            <Buy
                {...seat}
                seatIds={seatIds}
                seatsSelected={seatsSelected}
            />

            <div className="footer">
                <img src={seat.movie.posterURL} />
                <div>
                    <h3>{seat.movie.title}</h3>
                    <h3>{seat.day.weekday} - {seat.name}</h3>
                </div>

            </div>
        </>

    );
}

function Seats({ item, seatIds, setSeatIds, seatsSelected, setSeatsSelected }) {
    const [click, setClick] = useState(false);

    if (item.isAvailable === false) {
        return (
            <div className="indisponivel" onClick={() => alert("Esse assento não está disponível")}>{item.name}</div>
        )
    } else if (item.isAvailable === true && click === true) {
        function cancel() {
            setClick(!click)
            let filter = seatIds.filter((el) => el !== item.id);
            setSeatIds(filter);
            let newFilter = seatsSelected.filter((el) => el !== item.name);
            setSeatsSelected(newFilter);
        }

        return (
            <div className="reservado" onClick={cancel}>{item.name}</div>
        )
    } else {
        function reserve() {
            setClick(!click)
            let add = [...seatIds];
            add.push(item.id);
            setSeatIds(add);
            let newAdd = [...seatsSelected];
            newAdd.push(item.name);
            setSeatsSelected(newAdd);
        }

        return (
            <>
                <div className="disponivel" onClick={reserve}>{item.name}</div>
            </>
        );
    }

}

function Subtitle({ classe, status }) {
    return (
        <div className="subtitle">
            <span className={classe}></span>
            <p>{status}</p>
        </div>
    );
}

