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
    const handleTileClick = (인덱스) => {
        const 빈칸인덱스 = 보드.indexOf(null);
        const isAdjacent = (인덱스 === 빈칸인덱스 - 1 || 인덱스 === 빈칸인덱스 + 1 || 인덱스 === 빈칸인덱스 - 4 || 인덱스 === 빈칸인덱스 + 4);
        
        if (isAdjacent) {
            const 새로운보드 = [...보드];
            [새로운보드[인덱스], 새로운보드[빈칸인덱스]] = [새로운보드[빈칸인덱스], 새로운보드[인덱스]];
            보드설정(새로운보드);
        }
    };

    return (
        <div className='퍼즐'>
            <div className="퍼즐-컨테이너">
                {보드.map((값, 인덱스) => {
                    return (
                        <div key={인덱스} className={`퍼즐-조각 ${값 === null ? '빈칸' : ''}`}
                        onClick={() => handleTileClick(인덱스)}>{값+1}</div>
                    );
                })}
            </div>
        </div>
    );
};

export default Puzzle;
