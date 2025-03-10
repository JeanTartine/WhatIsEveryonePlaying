import IncorrectIcon from '../assets/incorrect.svg?react'
import CorrectIcon from '../assets/correct.svg?react'

export const Versus = ({playerIsGuessing = true, correctGuess= null}) => {

    const getBgColor = () => {
        if (correctGuess === null) {
            return 'bg-back-dark'
        }
        if (correctGuess === true) {
            return 'bg-green-500'
        }
        return 'bg-red-500'
    }

    return (
        <div className="fixed z-20 inset-0 pointer-events-none flex items-center justify-center h-[calc(100%_-_90px)] md:h-full">
            <div className={`rounded-full w-12 h-12 md:w-24 md:h-24 flex items-center justify-center transition-colors ${getBgColor()}`}>
                {playerIsGuessing &&
                    <p className="text-2xl md:text-3xl font-semibold">vs</p>
                }
                {!playerIsGuessing && correctGuess &&
                    <CorrectIcon className="w-3/4 h-3/4 fill-white"/>
                }
                {!playerIsGuessing && !correctGuess &&
                    <IncorrectIcon className="w-3/4 h-3/4 fill-white"/>
                }
            </div>
        </div>
    )
}