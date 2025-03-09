import {useGameLogic} from "../hooks/useGameLogic.js";
import {useEffect, useState} from "react";
import {Right} from "./Right.jsx";
import {Left} from "./Left.jsx";
import {GameOverScreen} from "./GameOverScreen.jsx";
import {Versus} from "./Versus.jsx";

export const Games = ({gamesData, score, setScore, highscore, setHighscore}) => {

    const [games, setGames] = useState(structuredClone(gamesData));
    const {pickGame, startGame, compareGames} = useGameLogic();
    const [gameInProgress, setGameInProgress] = useState(true);
    const [leftGame, setLeftGame] = useState(null);
    const [rightGame, setRightGame] = useState(null);

    // Guess if the game has lower or higher active players
    const guessGame = (higher) => {
        if (compareGames(leftGame, rightGame, higher)) {
            setLeftGame(rightGame)
            setRightGame(pickGame(games, setGames))
            setScore(score + 1)
            return;
        }
        if (score > highscore) {
            setHighscore(score)
        }
        setGameInProgress(false);
    }

    // If the array contains 100 games and the game is in progress that means we are starting a new game
    useEffect(() => {
        if (games.length === 100 && gameInProgress) {
            const startingGames = startGame(games, setGames);
            setLeftGame(startingGames[0]);
            setRightGame(startingGames[1]);
        }
    }, [gameInProgress, games])

    return (
        <>
            <div className="w-[100%] h-[100%] flex flex-row items-center justify-center">
                <Left game={leftGame}/>
                <Right game={rightGame}
                       gameInProgress={gameInProgress}
                       onHigher={() => guessGame(true)}
                       onLower={() => guessGame(false)}/>
            </div>
            <Versus/>
            {!gameInProgress &&
                <GameOverScreen score={score} onclick={() => {
                    setGameInProgress(true)
                    setScore(0)
                    setGames(structuredClone(gamesData));
                }}></GameOverScreen>
            }
        </>

    )
}