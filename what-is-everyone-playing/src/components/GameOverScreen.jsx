import {useEffect} from "react";

export const GameOverScreen = ({score, onclick}) => {

    return (
        <div className="
        fixed inset-0 bg-back-dark bg-opacity-90 z-30 flex flex-col items-center justify-center">
            <h2 className="text-5xl md:text-7xl font-semibold mb-2">{score}</h2>
            <h1 className="text-2xl font-bold mb-4">GAME OVER!</h1>
            <button onClick={onclick} className="mb-4 flex items-center justify-center bg-red-500 hover:bg-red-600 focus:bg-red-700 font-semibold w-56 py-3">
                <span>Try Again?</span>
            </button>
        </div>
    )
}