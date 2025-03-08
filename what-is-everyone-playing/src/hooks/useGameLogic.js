import {randomIntFromInterval} from "../utils/helpers.js";
import {useState} from "react";

export const useGameLogic = () => {

    const [score, setScore] = useState(0);
    const [highscore, setHighscore] = useState(0);

    // Pick a random game in the list and update the list
    const pickGame = (games, setGames) => {
        const index = randomIntFromInterval(0, games.length - 1)
        const game = games.splice(index, 1)[0];

        setGames(games);

        return game;
    }

    // Initialize the game by picking two random games in the list
    const startGame = (games, setGames) => {
        const gameLeft = pickGame(games, setGames);
        const gameRight = pickGame(games, setGames);

        return [gameLeft, gameRight];
    }

    const compareGames = (leftGame, rightGame, higher = true) => {
        if (higher) {
            return rightGame.concurrentPlayersPeakToday > leftGame.concurrentPlayersPeakToday;

        }
        return rightGame.concurrentPlayersPeakToday < leftGame.concurrentPlayersPeakToday;
    }

    return { score, setScore, highscore, setHighscore, pickGame, startGame, compareGames };
}