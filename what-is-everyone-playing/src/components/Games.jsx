import {useGameLogic} from "../hooks/useGameLogic.js";
import {useEffect, useState} from "react";
import {Right} from "./Right.jsx";
import {Left} from "./Left.jsx";
import {GameOverScreen} from "./GameOverScreen.jsx";

export const Games = ({gamesData, score, setScore, highscore, setHighscore}) => {

    const [games, setGames] = useState(structuredClone(gamesData));
    const {pickGame, startGame, compareGames} = useGameLogic();
    const [gameInProgress, setGameInProgress] = useState(true);
    const [leftGame, setLeftGame] = useState(null);
    const [rightGame, setRightGame] = useState(null);
    const [correctGuess, setCorrectGuess] = useState(null);
    const [playerIsGuessing, setPlayerIsGuessing] = useState(true)

    // Guess if the game has lower or higher active players
    const guessGame = (higher) => {
        setPlayerIsGuessing(false)
        if (compareGames(leftGame, rightGame, higher)) {

            setCorrectGuess(true)
            setTimeout(() => {
                setLeftGame(rightGame)
                setRightGame(pickGame(games, setGames))
                setScore(score + 1)
                setCorrectGuess(null)
                setPlayerIsGuessing(true)
            }, 1000)
        } else {
            if (score > highscore) {
                setHighscore(score)
            }
            setCorrectGuess(false)
            setTimeout(() =>  {
                setCorrectGuess(null)
                setGameInProgress(false);
                setPlayerIsGuessing(true)
            }, 1000)
        }
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
                       correctGuess={correctGuess}
                       playerIsGuessing={playerIsGuessing}
                       onHigher={() => guessGame(true)}
                       onLower={() => guessGame(false)}/>
            </div>
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