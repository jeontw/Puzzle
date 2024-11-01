import React, { useState } from 'react';
import Puzzle from './Puzzle';
import "./App.css"
import Stopwatch from './Stopwatch';
import Today from './Today';

const App = () => {
    const [isActive, setIsActive] = useState(false);
    const [isButtonVisible, setIsButtonVisible] = useState(true)
    const [seconds, setSeconds] = useState(0);
    const [k,setk] = useState(0);
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
                        setk={setk}
                        />
                    </div>
                    {/* <div className='기록'>
                        <Today
                        
                        k={k}
                        />
                        </div> */}
                    
                </div>
            </div>
        </>
    );
};

export default App;