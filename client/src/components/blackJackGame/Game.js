// React
import React, { useState, useContext, useEffect } from "react";

// Reactstrap
import { Button } from "reactstrap";

// Context
import { UserProfileContext } from "../../providers/UserProfileProvider";

export default function Game () {
    const { getUserInfo } = useContext(UserProfileContext);

    // Holds a full deck of cards. Will NOT be altered during the game.
    const allCards = [
        "Club_A", "Club_K", "Club_Q", "Club_J", "Club_10", "Club_9", "Club_8", "Club_7", "Club_6", "Club_5", "Club_4", "Club_3", "Club_2",
        "Diamond_A", "Diamond_K", "Diamond_Q", "Diamond_J", "Diamond_10", "Diamond_9", "Diamond_8", "Diamond_7", "Diamond_6", "Diamond_5", "Diamond_4", "Diamond_3", "Diamond_2",
        "Heart_A", "Heart_K", "Heart_Q", "Heart_J", "Heart_10", "Heart_9", "Heart_8", "Heart_7", "Heart_6", "Heart_5", "Heart_4", "Heart_3", "Heart_2",
        "Spade_A", "Spade_K", "Spade_Q", "Spade_J", "Spade_10", "Spade_9", "Spade_8", "Spade_7", "Spade_6", "Spade_5", "Spade_4", "Spade_3", "Spade_2"
    ]

    // Mutable array of cards that will be drawn from
    const [gameCards, setGameCards] = useState([...allCards]);

    // Boolean that represents whether it is still the player's turn
    const [isPlayerTurn, setIsPlayerTurn] = useState(true);

    // Default state of the player
    const basePlayerInfo = {
        cards: [],
        totalValue: 0,
        bust: false,
        money: 0
    }

    // Default state of the house
    const baseHouseInfo = {
        cards: [],
        totalValue: 0,
        bust: false,
    }

    // Set the default state of the player
    const [playerInfo, setPlayerInfo] = useState(basePlayerInfo);

    // Set the default state of the house
    const [houseInfo, setHouseInfo] = useState(baseHouseInfo);

    // Retrieve and set the state of the player's money
    useEffect(() => {
        getUserInfo()
        .then(user => {
            let player = {...playerInfo}
            player.money = user.money
            setPlayerInfo(player);
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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

    // Calculates the total value of all cards held by the respective player or house
    const calculateTotal = () => {
        let allTotals = [];
        let newValue = 0;
        if(isPlayerTurn){
            let player = {...playerInfo}
            player.cards.forEach(card => allTotals.push(getValue(card)))
            allTotals = allTotals.sort(function(a, b){return b-a})
            allTotals.forEach(value => {
                if (value === 1) (newValue + 11 > 21) ? newValue += 1 : newValue += 11
                else newValue += value
            })
            player.totalValue = newValue
            if(newValue > 21) player.bust = true;
            setPlayerInfo(player)
        }
        else {
            let house = {...houseInfo}
            house.cards.forEach(card => allTotals.push(getValue(card)))
            allTotals = allTotals.sort(function(a, b){return b-a})
            allTotals.forEach(value => {
                if(value === 1) (newValue + 11 > 21) ? newValue += 1 : newValue += 11
                else newValue += value
            })
            house.totalValue = newValue
            if(newValue > 21) house.bust = true
            setHouseInfo(house);
        }
    }

    // Handles drawing a new card for the Player or House
    const hit = () => {
        let cardIndex = Math.floor(Math.random()*gameCards.length);
        let cardDrawn = gameCards.splice(cardIndex,1)[0];
        if(isPlayerTurn) {
            let player = {...playerInfo}
            player.cards.push(cardDrawn);
            setPlayerInfo(player);
        }
        else {
            let house = {...houseInfo}
            house.cards.push(cardDrawn)
            setHouseInfo(house);
        }
        calculateTotal();

        // Determine if a reshuffle is needed
        if(gameCards.length < 1){
            let cardsInPlay = []
            if(playerInfo.cards.length) playerInfo.cards.forEach(card => cardsInPlay.push(card))
            if(houseInfo.cards.length) houseInfo.cards.forEach(card => cardsInPlay.push(card))
            let newGameCards = allCards.filter(card => !cardsInPlay.includes(card));
            setGameCards(newGameCards);
        }
    }    

    return(
        <>
            <div id="houseSection">
                HOUSE
                <div className="cards">
                    {houseInfo.cards.length ? houseInfo.cards.map(card => <div key={card}>{card}</div>) : <div>No Cards</div>}
                </div>
                <div className="value">
                    {houseInfo.totalValue} {houseInfo.bust ? "Bust!" : ""} {houseInfo.totalValue === 21 ? "BlackJack!" : ""}
                </div>
            </div>
            <div>-------------------</div>
            <div id="playerSection">
                PLAYER
                <div className="cards">
                    {playerInfo.cards.length ? playerInfo.cards.map(card => <div key={card}>{card}</div>) : <div>No Cards</div>}
                </div>
                <div className="value">
                    {playerInfo.totalValue} {playerInfo.bust ? "Bust!" : ""} {playerInfo.totalValue === 21 ? "BlackJack!" : ""}
                </div>
                <div className="money">
                    Money: {playerInfo.money}
                </div>
            </div>

            <Button 
                disabled={playerInfo.bust || !isPlayerTurn}
                onClick={() => {
                hit()
            }}>
                Hit
            </Button>

            <Button 
                disabled={!isPlayerTurn}
                onClick={() => {
                setIsPlayerTurn(false)
            }}>
                Stay
            </Button>

        </>
    )
}