import React from 'react';
import Puzzle from './Puzzle';
import "./App.css"

const App = () => {
    return (
        <div className="App">
            <div>빈공간과 온클릭 인덱스가 1~4 5~8 9~12 13~16 일때만 온클릭 함수가 발동되게 한다</div>
            <div>셔플을 누르면 온클릭을 100번 누르게한다--온클릭의 인덱스는 랜덤값으로 한다</div>
            <div>시간기록재고, 랭킹업로드기능(이름입력가능)</div>
            <Puzzle />
        </div>
    );
};

export default App;
