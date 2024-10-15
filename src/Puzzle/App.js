import React, { useState } from 'react';
import Puzzle from './Puzzle';
import "./App.css"
import Stopwatch from './Stopwatch';

const App = () => {
    const [isActive, setIsActive] = useState(false);
    const [isButtonVisible, setIsButtonVisible] = useState(true)
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
                        setIsButtonVisible={setIsButtonVisible}/>
                    </div>
                    <div className='기록'>나의 기록 평균 등 예정</div>
                    
                </div>
                <div className='미정'>World Ranking</div>
            </div>
        </>
    );
};

export default App;