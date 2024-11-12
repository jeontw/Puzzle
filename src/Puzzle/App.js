import React, { useState } from 'react';
import Puzzle from './Puzzle';
import "./App.css"
import NxN from './NxN';

const App = () => {
    const [seconds, setSeconds] = useState(0);
    const [level, setlevel] = useState(4);
    const [승리판, set승리판] = useState(false);
    const [기록하기, set기록하기] = useState(false);
    const [input, setInput] = useState('');
    return (
            <div className="App">
                <h1>Sliding Puzzle</h1>
                <div className='App-전체화면'>
                    <div className='App-전체화면-게임화면'>
                        <Puzzle
                            seconds={seconds}
                            setSeconds={setSeconds}
                            level={level}
                            setlevel={setlevel}
                            set승리판={set승리판}
                            set기록하기={set기록하기}
                            기록하기={기록하기}
                            승리판={승리판}
                            setInput={setInput}
                            input={input}
                        />
                            <div>
                                <NxN
                                    input={input}
                                    seconds={seconds}
                                    level={level}
                                    기록하기={기록하기}
                                />
                            </div>
                    </div>
                </div>
            </div>
    );
};

export default App;