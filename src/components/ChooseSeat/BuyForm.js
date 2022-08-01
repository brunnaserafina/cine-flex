import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./style.css";

export default function BuyForm({ movie, day, name, seatIds, seatsSelected }) {
    const navigate = useNavigate();
    const [buyer, setBuyer] = useState("");
    const [cpf, setCpf] = useState("");

    function handleSubmit(event) {
        event.preventDefault();

        if (seatIds.length === 0) {
            alert("Favor selecionar no mínimo um assento");
        } else if (buyer === "" || cpf === "") {
            alert("Favor preencher os campos solicitados");
        } else {
            const promise = axios.post(
                "https://mock-api.driven.com.br/api/v7/cineflex/seats/book-many",
                {
                    ids: seatIds,
                    name: buyer,
                    cpf: cpf,
                },
            );
            promise.then(
                navigate("/sucesso", {
                    state: {
                        title: movie.title,
                        date: day.date,
                        hour: name,
                        seats: { seatsSelected },
                        buyer: buyer,
                        cpf: cpf
                    },
                }),
            );
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <h4 className="info">Nome do comprador:</h4>
                <input className="input"
                    type="text"
                    placeholder="Digite seu nome..."
                    pattern="([aA-zZ]+)"
                    required
                    title="Insira seu nome"
                    value={buyer}
                    onChange={(e) => setBuyer(e.target.value)}
                />
            </div>

            <div>
                <h4 className="info">CPF do comprador:</h4>
                <input className="input"
                    type="text"
                    placeholder="Digite seu CPF... "
                    pattern="^([0-9]){3}\.([0-9]){3}\.([0-9]){3}-([0-9]){2}$"
                    required
                    title="Insira seu CPF no formato 000.000.000-00"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                />
            </div>

            <button className="reserve" type="submit">Reservar assento(s)</button>
        </form>
    )
}