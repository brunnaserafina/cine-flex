import { useState } from "react";
import "./style.css";

export default function Seats({ item, seatIds, setSeatIds, seatsSelected, setSeatsSelected }) {
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