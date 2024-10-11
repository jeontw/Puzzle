import React from 'react';
import Puzzle from './Puzzle';
import "./App.css"

const App = () => {
    return (
        <div className="App">
            <div>셔플을 누르면 온클릭을 100번 누르게한다</div>
            <div>시간기록재고, 랭킹업로드기능(이름입력가능)</div>
            <Puzzle />
        </div>
    );
};

export default App;
