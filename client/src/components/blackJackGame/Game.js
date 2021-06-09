import React, { useState } from "react";
import { Button } from "reactstrap";

export default function Game () {

    // NOTES
    /*
        Game Progression:
        Player makes a bet

        If at any point the length of the gameCards array is less than 1, copy all cards in the allCards
        array that are not currently in the player's or dealer's hand
        
        The player receive two cards, both face up
        The dealer then gives themself one face up and one face down card

        If the player has 21 at the start, they win automatically unless the dealer gets blackjack
        After the player busts (>21) or decides to stay, the dealer then begins their turn
        The dealer MUST draw if their total is <= 16 and MUST stay on any combo that is >= 17
        
        Game End:
        If the player's total is > dealer's total & <= 21, the player wins
        If both the player and the dealer have 21, the dealer wins (Player loses all bet)
        if the player's total is < dealer's total, the dealer wins ()

        Regardless of who wins, set the player's cards and dealer's cards back to an empty array

    */

    // Holds a full deck of cards. Will NOT be altered during the game.
    const allCards = [
        "Club_A", "Club_K", "Club_Q", "Club_J", "Club_10", "Club_9", "Club_8", "Club_7", "Club_6", "Club_5", "Club_4", "Club_3", "Club_2",
        "Diamond_A", "Diamond_K", "Diamond_Q", "Diamond_J", "Diamond_10", "Diamond_9", "Diamond_8", "Diamond_7", "Diamond_6", "Diamond_5", "Diamond_4", "Diamond_3", "Diamond_2",
        "Heart_A", "Heart_K", "Heart_Q", "Heart_J", "Heart_10", "Heart_9", "Heart_8", "Heart_7", "Heart_6", "Heart_5", "Heart_4", "Heart_3", "Heart_2",
        "Spade_A", "Spade_K", "Spade_Q", "Spade_J", "Spade_10", "Spade_9", "Spade_8", "Spade_7", "Spade_6", "Spade_5", "Spade_4", "Spade_3", "Spade_2"
    ]

    const [gameCards, setGameCards] = useState([...allCards]);

    const [isPlayerTurn, setIsPlayerTurn] = useState(true);

    const [playerCards, setplayerCards] = useState([]);
    const [playerTotal, setPlayerTotal] = useState(0);
    const [playerBust, setPlayerBust] = useState(false);

    const [houseCards, sethouseCards] = useState([]);
    const [houseTotal, setHouseTotal] = useState(0);
    const [houseBust, setHouseBust] = useState(false);

    // Takes a card and returns its numerical value
    const getValue = card => {
        let cardName = card[card.indexOf("_")+1]
        
        // If the card is 2-10, just return the value
        if(parseInt(cardName) && cardName !== "1") return parseInt(cardName)

        // Otherwise, it is a face card, determine the value
        return determineValue(cardName);
    }

    // Returns corresponding numerical value for 10, J, Q, K, A Cards
    const determineValue = cardName => {
        let value = 0;
        switch(cardName){
            case "A":
                value = 1
                break;
            default:
                value = 10;
        }
        return value;
    }


    const calculateTotal = () => {
        if(isPlayerTurn){
            let allTotals = [];
            let newValue = 0;
            playerCards.forEach(card => allTotals.push(getValue(card)))
            allTotals = allTotals.sort(function(a, b){return b-a})
            allTotals.forEach(value => {
                console.log(value)
                if(value === 1){
                    if(newValue+11 > 21){
                        newValue += 1
                    }
                    else{
                        newValue += 11
                    }
                }
                else {
                    newValue += value
                }
            })
            setPlayerTotal(newValue)
        }
        else {
            let allTotals = [];
            houseCards.forEach(card => allTotals.push(getValue(card)))
            allTotals = allTotals.sort(function(a, b){return b-a})
            allTotals.forEach(value => {
                if(value === 1){
                    if(houseTotal+11 > 21) setHouseTotal(houseTotal+1)
                    else setHouseTotal(houseTotal+11)
                }
                else {
                    setHouseTotal(houseTotal+value)
                }
            })
        }
    }

    // Handles drawing a new card for the Player or House
    const draw = () => {
        let cardIndex = Math.floor(Math.random()*gameCards.length);
        let cardDrawn = gameCards.splice(cardIndex,1)[0];
        isPlayerTurn ? playerCards.push(cardDrawn) : houseCards.push(cardDrawn);

        // Determine if a reshuffle is needed
        if(gameCards.length < 1){
            let cardsInPlay = []
            if(playerCards.length) playerCards.forEach(card => cardsInPlay.push(card))
            if(houseCards.length) houseCards.forEach(card => cardsInPlay.push(card))
            gameCards = allCards.filter(card => !cardsInPlay.includes(card));
        }
    }

    const hit = () => {
        draw();
        calculateTotal();
        console.log("Game Cards", gameCards, "Player Cards", playerCards)
    }

    const stay = () => {
        setIsPlayerTurn(false);
    }

    return(
        <>
            <div id="houseSection">
                {houseCards.length ? houseCards.forEach(card => <div>{card}</div>) : <div>No Cards</div>}
                {houseTotal}
            </div>

            <div id="playerSection">
                {playerCards.length ? playerCards.forEach(card => <div>{card}</div>) : <div>No Cards</div>}
                {playerTotal} {playerTotal > 21 ? "Bust!" : ""} {playerTotal === 21 ? "BlackJack!" : ""}
            </div>

            <Button 
                disabled={playerTotal >= 21 || !isPlayerTurn}
                onClick={() => {
                hit()
            }}>
                Hit
            </Button>

            <Button 
                disabled={!isPlayerTurn}
                onClick={() => {
                stay();
            }}>
                Stay
            </Button>

        </>
    )
}