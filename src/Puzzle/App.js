import React, { useState } from 'react';
import Puzzle from './Puzzle';
import "./App.css"
import Today from './Today';

const App = () => {
    const [seconds, setSeconds] = useState(0);

    return (
            <div className="App">
                <h1>Sliding Puzzle</h1>
                <div className='App-전체화면'>
                    <div className='App-전체화면-게임화면'>
                        <Puzzle
                            seconds={seconds}
                            setSeconds={setSeconds}
                        />
                            <div className='기록'>
                                <Today
                                    seconds={seconds}
                                />
                            </div>
                    </div>
                </div>
            </div>
    );
};

export default App;