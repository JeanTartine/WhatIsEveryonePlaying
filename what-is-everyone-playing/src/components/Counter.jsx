import {useRef, useState, useEffect} from "react";

export const Counter = ({targetValue, duration = 1000, onComplete}) => {
    const [count, setCount] =  useState(0);
    const counterRef = useRef(null);

    useEffect(() => {
        if (counterRef.current) {

            const frameRate = 30;
            const timeBetweenFrames = 1000 / frameRate
            const totalFrames = duration / timeBetweenFrames; // x à la place de / ?
            const increment = targetValue / totalFrames;

            let currentCount = 0;
            const timer = setInterval(() => {
                currentCount += increment;

                if (currentCount >= targetValue) {
                    setCount(targetValue);
                    clearInterval(timer);
                    if (onComplete) {
                        onComplete();
                    }
                } else {
                    setCount(Math.floor(currentCount));
                }
            }, timeBetweenFrames);

            return () => clearInterval(timer);
        }
    }, [targetValue, duration]);

    return (
        <h1 ref={counterRef} className="text-4xl lg:text-5xl font-semibold mx-3 mb-2 md:mb-3">
            {count.toLocaleString()}
        </h1>
    )
}