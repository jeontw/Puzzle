import React, { useState, useEffect } from 'react';

const Stopwatch = ({ isActive }) => {
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
    };

    return (
        <div>
            <h1>스톱워치: {seconds} 초</h1>
            <button onClick={handleReset}>리셋</button>
        </div>
    );
};

export default Stopwatch;
