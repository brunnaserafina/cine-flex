import { useLocation, Link } from "react-router-dom";
import "./style.css";

export default function Finish() {
    const { state } = useLocation();

    return (
        <div className="sucess">
            <div className="solicitation">
                <h3>Pedido feito</h3>
                <h3>com sucesso!</h3>
            </div>

            <div className="session-movie">
                <h4>Filme e sessão</h4>
                <p>{state.title}</p>
                <p>{state.date} {state.hour}</p>
            </div>

            <div className="tickets">
                <h4>Ingressos</h4>
                {state.seats.seatsSelected.map((seat, index) => {
                    return <p key={index}>Assento {seat}</p>;
                })}
            </div>

            <div className="session-movie">
                <h4>Comprador</h4>
                <p>Nome: {state.buyer} </p>
                <p>CPF: {state.cpf} </p>
            </div>

            <Link to={`/`}>
                <button className="button-back">Voltar pra Home</button>
            </Link>
        </div>

    );
}