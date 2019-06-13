import React from "react";
import "./style.css";

function GameCard(props) {
    return (
    <div className="col-6 col-sm-4 col-md-3 m-auto" onClick={() => {props.isClicked(props.id)}}>
        <img
        className="card"
        alt={props.name}
        src={props.image}
        id={props.id}
        />
    </div>
    );
}

export default GameCard;