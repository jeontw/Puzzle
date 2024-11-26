import React, { useState } from 'react';
import Puzzle from './Puzzle';
import Data from './Data';

const Game = () => {
    const [seconds, setSeconds] = useState(0);
    const [level, setlevel] = useState(4);
    const [기록, set기록] =useState(false);

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
                            set기록={set기록}
                            기록={기록}
                        />
                    <div>
                        <div>
                            {level === 3 && <Data seconds={seconds} set기록={set기록} 기록={기록} level={level} />}
                            {level === 4 && <Data seconds={seconds} set기록={set기록} 기록={기록} level={level} />}
                            {level === 5 && <Data seconds={seconds} set기록={set기록} 기록={기록} level={level} />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Game;