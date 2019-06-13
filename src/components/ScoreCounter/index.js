import React from "react";

function ScoreCounter(props) {
    return (
        <span>Score: {props.score} | Top Score: {props.highScore}</span>
    );
}

export default ScoreCounter;