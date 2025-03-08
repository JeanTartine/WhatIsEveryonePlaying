import {default as UpArrow} from "../../src/assets/baseline-arrow-upward.svg"
import {useState} from "react";
import {Counter} from "./Counter.jsx";

export const Right = ({game, onHigher, onLower, gameInProgress}) => {
    const [displayCounter, setDisplayCounter] = useState(false)
    const [isGuessing, setIsGuessing] = useState(false)
    const [onCompleteAction, setOnCompleteAction] = useState(null);

    // Handle the counter completion
    const handleCounterComplete = () => {
        setTimeout(() => {
            if (onCompleteAction) {
                onCompleteAction();
                setOnCompleteAction(null);
            }
            setIsGuessing(false);
            setDisplayCounter(false);
        }, 1000);
    };

    const onGuess = (guessFunction) => {
        if (isGuessing) {
            return;
        }

        setIsGuessing(true)
        setDisplayCounter(true)
        setOnCompleteAction(() => guessFunction)
    }

    return (
        <>
            {game &&
                <div className="flex flex-col items-center w-1/2">
                    <img src={game.gameImage} alt={game.gameName} className="mb-4"/>
                    <h2 className="text-xl lg:text-3xl font-semibold text-center mx-20 md:mx-14 mb-2 md:mb-6">{game.gameName}</h2>
                    <h3 className="text-gray-400 text-sm lg:text-lg mb-2 md:mb-3">has</h3>

                    {!displayCounter
                        ? <>
                            <button disabled={isGuessing} className="block bg-red-500 hover:bg-red-600 focus:bg-red-700 text-base md:text-xl font-semibold w-[50%] md:w-52 py-2 mb-4"
                                    onClick={() => onGuess(onHigher)}>
                                More
                            </button>
                            <button disabled={isGuessing} className="block bg-indigo-500 hover:bg-indigo-600 focus:bg-indigo-700 text-base md:text-xl font-semibold w-[50%] mr-4 md:mr-0 md:w-52 py-2 mb-4"
                                    onClick={() => onGuess(onLower)}>
                                Fewer
                            </button>
                        </>
                        : <>
                            <Counter
                                targetValue={game.concurrentPlayersPeakToday}
                                duration={1000}
                                onComplete={handleCounterComplete}
                            />
                        </>
                    }
                    <h3 className="text-gray-400 text-sm lg:text-lg">active players</h3>
                </div>
            }
        </>
    )
}
