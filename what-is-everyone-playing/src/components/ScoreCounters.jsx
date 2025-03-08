import {useEffect} from "react";

export const ScoreCounters = ({score, setScore, highscore}) => {

    return (
        <div className="fixed flex flex-col pointer-events-none mr-4 mt-3 z-10 inset-0 md:flex-row items-end md:items-stretch md:mt-0 md:mr-0">
            <div className="flex justify-end md:w-1/2 mt-0 md:mt-4">
                <div className="flex md:flex-col items-center md:items-end">
                    <p className="text-xl font-semibold ml-2 order-1 md:-order-1 md:ml-0">{highscore}</p>
                    <p className="text-sm text-gray-400 md:text-base">Highscore</p>
                </div>
            </div>
            <div className="z-20 md:border-r-[2px] border-white mx-4"/>
            <div className="md:w-1/2 mt-0 md:mt-4">
                <div className="flex items-center md:flex-col md:items-start">
                    <p className="text-xl ml-2 font-semibold order-1 md:-order-1 md:ml-0">{score}</p>
                    <p className="text-sm text-gray-400 md:text-base">Score</p>
                </div>
            </div>
        </div>
    )
}