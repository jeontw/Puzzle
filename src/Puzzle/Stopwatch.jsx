import React, { useState, useEffect } from 'react';

const Stopwatch = ({ isActive,seconds,setIsActive, setSeconds}) => {


    const [intervalId, setIntervalId] = useState(null); // interval ID를 상태로 관리

    useEffect(() => {
        let interval;

        if (isActive) {
            interval = setInterval(() => {
                setSeconds(prevSeconds => prevSeconds + 0.1);
            }, 100);
            setIntervalId(interval); // interval ID를 저장
        }

        return () => clearInterval(interval); // cleanup
    }, [isActive, setSeconds]);


    const handleReset = () => {
        clearInterval(intervalId); // 타이머 정지
        setSeconds(0); // 시간 초기화
        setIsActive(false); // 타이머 비활성화
        setIntervalId(null); // intervalId 초기화
    };

    return (
        <div className='타이머'>
            <h1>이미지</h1>
            <h1>Timer: {seconds.toFixed(1)}s</h1>
            <button onClick={handleReset}>기록</button>
        </div>
    );
};

export default Stopwatch;