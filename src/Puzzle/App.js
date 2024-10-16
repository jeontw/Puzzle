import React, { useState } from 'react';
import Puzzle from './Puzzle';
import "./App.css"
import Stopwatch from './Stopwatch';
import Today from './Today';
import World from './World';

const App = () => {
    const [isActive, setIsActive] = useState(false);
    const [isButtonVisible, setIsButtonVisible] = useState(true)
    const [seconds, setSeconds] = useState(0);
    return (
        <>
            <h1 className='제목'>Sliding Puzzle</h1>
            <div className="App">
                <div className='전체화면'>
                    <div className='게임화면'>
                        <Puzzle 
                        setIsActive={setIsActive}
                        isButtonVisible={isButtonVisible}
                        setIsButtonVisible={setIsButtonVisible} />
                        <Stopwatch 
                        isActive={isActive} 
                        setIsButtonVisible={setIsButtonVisible}
                        seconds={seconds}
                        setSeconds={setSeconds}
                        />
                    </div>
                    <div className='기록'>
                        <Today
                        seconds={seconds}
                        />
                        </div>
                    
                </div>
                <div className='미정'><World></World></div>
            </div>
        </>
    );
};

export default App;