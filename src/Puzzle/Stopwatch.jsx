import React, { useEffect } from 'react';

const Stopwatch = ({ isActive,setIsButtonVisible,seconds, setSeconds }) => {
    

    useEffect(() => {
        let interval;

        if (isActive) {
            interval = setInterval(() => {
                setSeconds(prevSeconds => prevSeconds + 0.1);
            }, 100);
        }

        return () => clearInterval(interval);
    }, [isActive, setSeconds]);

    const handleReset = () => {
        setSeconds(0);
        setIsButtonVisible(true);
    };

    return (
        <div className='타이머'>
            <h1>Timer: {seconds.toFixed(1)}s</h1>
            <button onClick={handleReset}>기록</button>
        </div>
    );
};

export default Stopwatch;
