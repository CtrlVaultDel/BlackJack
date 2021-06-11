// React
import React from "react";
// =========================== IMPORTS END ===========================


// Handles receiving card info and returning the appropriate image
const Card = ({ card }) => 
    <img 
        className="playingCard" 
        src={`cards/${card}.png`} 
        alt={card} 
    />

export default Card;