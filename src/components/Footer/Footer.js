import "./style.css"

export default function Footer({ title, posterURL }) {
    return (
        <div className="footer">
            <img src={posterURL} />
            <h3>{title}</h3>
        </div>
    );
}