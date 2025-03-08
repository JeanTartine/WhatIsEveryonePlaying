import AnimatedNumbers from "react-animated-numbers";
import {Counter} from "./Counter.jsx";

export const Left = ({game}) => {
    return (
        <>
            {game &&
                <div className="flex flex-col items-center w-1/2">
                    <img src={game.gameImage} alt={game.gameName} className="mb-4"/>
                    <h2 className="text-xl lg:text-3xl font-semibold text-center mx-20 md:mx-14 mb-2 md:mb-6">{game.gameName}</h2>
                    <h3 className="text-gray-400 text-sm lg:text-lg mb-2 md:mb-3">has</h3>
                    <h1 className="text-4xl lg:text-5xl font-semibold mx-3 mb-2 md:mb-3">
                        {game.concurrentPlayersPeakToday.toLocaleString()}
                    </h1>
                    <h3 className="text-gray-400 text-sm lg:text-lg">active players</h3>
                </div>
            }
        </>
    )
}