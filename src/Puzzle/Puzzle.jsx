import React, { useState } from 'react';
import "./Puzzle.css";

const Puzzle = ({ setIsActive, isButtonVisible, setIsButtonVisible }) => {


    let level = 5;
    const [퍼즐판, set퍼즐판] = useState([...Array(level*level-1).keys(), null]);
    const [유효타일, set유효타일] = useState(true);


    const 타일이동 = (idx, 빈칸idx, 퍼즐판) => {
        if (idx - 빈칸idx === level || idx - 빈칸idx === -level || idx - 빈칸idx === 2*level ||
            idx - 빈칸idx === -2*level || idx - 빈칸idx === 3*level || idx - 빈칸idx === -3*level || 
            idx - 빈칸idx === 4*level || idx - 빈칸idx === -4*level) {

            if (idx === 빈칸idx - level || idx === 빈칸idx + level) {
                [퍼즐판[idx], 퍼즐판[빈칸idx]] = [퍼즐판[빈칸idx], 퍼즐판[idx]];
            } 
            else if (idx === 빈칸idx - level*2) {
                [퍼즐판[idx], 퍼즐판[idx + level], 퍼즐판[빈칸idx]] = 
                    [퍼즐판[빈칸idx], 퍼즐판[idx], 퍼즐판[idx + level]];
            } 
            else if (idx === 빈칸idx + level*2) {
                [퍼즐판[idx], 퍼즐판[idx - level], 퍼즐판[빈칸idx]] = 
                    [퍼즐판[빈칸idx], 퍼즐판[idx], 퍼즐판[idx - level]];
            }
            else if (idx === 빈칸idx - level*3) {
                [퍼즐판[idx], 퍼즐판[idx + level], 퍼즐판[idx + level*2], 퍼즐판[빈칸idx]] = 
                    [퍼즐판[빈칸idx], 퍼즐판[idx], 퍼즐판[idx + level], 퍼즐판[idx + level*2]];
            } 
            else if (idx === 빈칸idx + level*3) {
                [퍼즐판[idx], 퍼즐판[idx - level], 퍼즐판[idx - level*2], 퍼즐판[빈칸idx]] = 
                    [퍼즐판[빈칸idx], 퍼즐판[idx], 퍼즐판[idx - level], 퍼즐판[idx - level*2]];
            }
            else if (idx === 빈칸idx - level*4) {
                [퍼즐판[idx], 퍼즐판[idx + level], 퍼즐판[idx + level*2], 퍼즐판[idx + level*3], 퍼즐판[빈칸idx]] = 
                    [퍼즐판[빈칸idx], 퍼즐판[idx], 퍼즐판[idx + level], 퍼즐판[idx + level*2], 퍼즐판[idx + level*3]];
            } 
            else if (idx === 빈칸idx + level*4) {
                [퍼즐판[idx], 퍼즐판[idx - level], 퍼즐판[idx - level*2], 퍼즐판[idx - level*3], 퍼즐판[빈칸idx]] = 
                    [퍼즐판[빈칸idx], 퍼즐판[idx], 퍼즐판[idx - level], 퍼즐판[idx - level*2], 퍼즐판[idx - level*3]];
            }

            return set유효타일(true);
        }

        if (idx - 빈칸idx <level || idx - 빈칸idx <-level) {
            if (((0 <= idx && idx < level) && (0 <= 빈칸idx && 빈칸idx < level)) ||
                ((level <= idx && idx < level*2) && (level <= 빈칸idx && 빈칸idx < level*2)) ||
                ((level*2 <= idx && idx < level*3) && (level*2 <= 빈칸idx && 빈칸idx < level*3)) ||
                ((level*3 <= idx && idx < level*4) && (level*3 <= 빈칸idx && 빈칸idx < level*4)) ||
                ((level*4 <= idx && idx < level*5) && (level*4 <= 빈칸idx && 빈칸idx < level*5))
            ) {
                if (idx === 빈칸idx - 1 || idx === 빈칸idx + 1) {
                    [퍼즐판[idx], 퍼즐판[빈칸idx]] = [퍼즐판[빈칸idx], 퍼즐판[idx]];
                } else if (idx === 빈칸idx - 2) {
                    [퍼즐판[idx], 퍼즐판[idx + 1], 퍼즐판[빈칸idx]] = [퍼즐판[빈칸idx], 퍼즐판[idx], 퍼즐판[idx + 1]];
                } else if (idx === 빈칸idx + 2) {
                    [퍼즐판[idx], 퍼즐판[idx - 1], 퍼즐판[빈칸idx]] = [퍼즐판[빈칸idx], 퍼즐판[idx], 퍼즐판[idx - 1]];
                } else if (idx === 빈칸idx - 3) {
                    [퍼즐판[idx], 퍼즐판[idx + 1], 퍼즐판[idx + 2], 퍼즐판[빈칸idx]] = [퍼즐판[빈칸idx], 퍼즐판[idx], 퍼즐판[idx + 1], 퍼즐판[idx + 2]];
                } else if (idx === 빈칸idx + 3) {
                    [퍼즐판[idx], 퍼즐판[idx - 1], 퍼즐판[idx - 2], 퍼즐판[빈칸idx]] = [퍼즐판[빈칸idx], 퍼즐판[idx], 퍼즐판[idx - 1], 퍼즐판[idx - 2]];
                } else if (idx === 빈칸idx - 4) {
                    [퍼즐판[idx], 퍼즐판[idx + 1], 퍼즐판[idx + 2], 퍼즐판[idx + 3], 퍼즐판[빈칸idx]] = [퍼즐판[빈칸idx], 퍼즐판[idx], 퍼즐판[idx + 1], 퍼즐판[idx + 2], 퍼즐판[idx + 3]];
                } else if (idx === 빈칸idx + 4) {
                    [퍼즐판[idx], 퍼즐판[idx - 1], 퍼즐판[idx - 2], 퍼즐판[idx - 3], 퍼즐판[빈칸idx]] = [퍼즐판[빈칸idx], 퍼즐판[idx], 퍼즐판[idx - 1], 퍼즐판[idx - 2], 퍼즐판[idx - 3]];
                }
                return set유효타일(true);
            }
        }
        else{
            return set유효타일(false);
        }
        
    };

    //마지막 인덱스가 셔플이
    const 셔플시작 = () => {
        setIsButtonVisible(false);
        for (let i = 0; i < level*100; i++) {
            if (유효타일===true) {
                setTimeout(() => {
                    const 빈칸idx = 퍼즐판.indexOf(null);
                    const 랜덤idx = 퍼즐판[Math.floor(Math.random() * 퍼즐판.length)];
                    타일이동(랜덤idx, 빈칸idx, 퍼즐판);
                    set퍼즐판([...퍼즐판]);
                }, i * 10);
            }
        }
    };


    const 타일클릭 = (idx) => {
        const 빈칸idx = 퍼즐판.indexOf(null);
        타일이동(idx, 빈칸idx, 퍼즐판) 
            승리확인(퍼즐판);
            setIsActive(true);
    };



    //승리확인은 나중에 다시한번 보자
    const 승리확인 = () => {
        const 승리판 = [...Array(level*level-1).keys(), null];
        if (JSON.stringify(퍼즐판) === JSON.stringify(승리판)) {
            console.log('승리!');
            setIsActive(false);
        }
    };

    return (
        <div className='퍼즐'>
            {isButtonVisible ? (<button className='btn' onClick={셔플시작}>서플 버튼</button>) : null}
            <div className='퍼즐-컨테이너'
                style={{
                    gridTemplateColumns: `repeat(${level}, 100px)`,
                    gridTemplateRows: `repeat(${level}, 100px)`,
                }}
            >

                {퍼즐판.map((값, idx) => (
                    <div
                        className={`퍼즐-조각 ${값 === null ? '빈칸' : ''}`}
                        key={idx}
                        onClick={() => 타일클릭(idx)}
                    >
                        {값 !== null ? 값 + 1 : ''}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Puzzle;
