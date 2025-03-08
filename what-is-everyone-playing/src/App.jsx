import './App.css'
import {LoadingScreen} from "./components/LoadingScreen.jsx";
import {useEffect, useState} from "react";
import {Games} from './components/Games.jsx';
import "./index.css";
import {ScoreCounters} from "./components/ScoreCounters.jsx";
import {useGameLogic} from "./hooks/useGameLogic.js";
import axios from "axios";

function App() {
    const [isLoading, setIsLoading] = useState(false);
    const [gamesData, setGamesData] = useState([]);
    const {score, setScore, highscore, setHighscore} = useGameLogic();

    const fetchGames = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/games");
            // Update state with fetched data
            setGamesData(response.data.games);
        } catch (error) {
            console.error('Error getting scrap games from server:', error);
        } finally {
            setIsLoading(true);
        }

    }

    useEffect(() => {
        fetchGames();
    }, [])

    return (
        <div className="h-screen w-screen">
            {!isLoading
                ? (
                    <LoadingScreen/>
                )
                : (
                    <>
                        <Games gamesData={gamesData}
                               score={score}
                               setScore={setScore}
                               highscore={highscore}
                               setHighscore={setHighscore}
                        />
                        <ScoreCounters score={score} setScore={setScore} highscore={highscore}/>
                    </>
                )
            }
        </div>
    )
}

export default App
