import React, { useState } from 'react';
import Puzzle from './Puzzle';
import "./App.css"
import Stopwatch from './Stopwatch';

const App = () => {
    const [isActive, setIsActive] = useState(false);
    return (
        <div className="App">
            <div>랜덤셔플 따로 만들기 이동 함수 따로 만들고 리셋을 누르면 기록 초기화와 함께 랭킹 등록 이름 작성후 정렬</div>
            <Puzzle setIsActive={setIsActive} />
            <Stopwatch isActive={isActive} />
        </div>
    );
};

export default App;