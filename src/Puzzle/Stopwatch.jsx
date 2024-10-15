import React, { useState, useEffect } from 'react';

const Stopwatch = ({ isActive,setIsButtonVisible }) => {
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        let interval;

        if (isActive) {
            interval = setInterval(() => {
                setSeconds(prevSeconds => prevSeconds + 1);
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [isActive]);

    const handleReset = () => {
        setSeconds(0);
        setIsButtonVisible(true);
    };

    return (
        <div className='타이머'>
            <h1>Timer: {seconds} s</h1>
            <button onClick={handleReset}>기록</button>
        </div>
    );
};

export default Stopwatch;
