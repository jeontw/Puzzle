import React, { useState } from 'react';
import './Puzzle.css';

const Puzzle = () => {
    const [보드, 보드설정] = useState(보드생성());
    //스테이트 추가


    function 보드생성() {
        const 숫자들 = [...Array(15).keys(), null];
        return shuffleArray(숫자들);
    }

    function shuffleArray(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    //클릭 알고리즘 함수

    return (
        <div className='퍼즐'>
            <div className="퍼즐-컨테이너">
                {보드.map((값, 인덱스) => {
                    //const 2차원
                    return (
                        <div key={인덱스} className={`퍼즐-조각 ${값 === null ? '빈칸' : ''}`}>{값+1}</div> //온클릭
                    );
                })}
            </div>
        </div>
    );
};

export default Puzzle;
