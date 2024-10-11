import React, { useState } from 'react';
import './Puzzle.css';

const Puzzle = () => {
    const [board, setBoard] = useState(createBoard());

    function createBoard() {
        const numbers = [...Array(15).keys(), null];
        return numbers;
    }

    const handleTileClick = (idx) => {
        const emptyIndex = board.indexOf(null);
        const newBoard = [...board];
        const isAdjacent = (idx === emptyIndex - 4 || idx === emptyIndex + 4 || idx === emptyIndex - 8 || idx === emptyIndex + 8 || idx === emptyIndex - 12 || idx === emptyIndex + 12);
        const exception = (idx === emptyIndex - 1 || idx === emptyIndex + 1 || idx === emptyIndex - 2 || idx === emptyIndex + 2 || idx === emptyIndex - 3 || idx === emptyIndex + 3);

        if (isAdjacent) {
            if (idx === emptyIndex - 4 || idx === emptyIndex + 4) {
                [newBoard[idx], newBoard[emptyIndex]] = [newBoard[emptyIndex], newBoard[idx]];
            }
            if (idx === emptyIndex - 8) {
                [newBoard[idx], newBoard[idx + 4], newBoard[emptyIndex]] = [newBoard[emptyIndex], newBoard[idx], newBoard[idx + 4]];
            }
            if (idx === emptyIndex + 8) {
                [newBoard[idx], newBoard[idx - 4], newBoard[emptyIndex]] = [newBoard[emptyIndex], newBoard[idx], newBoard[idx - 4]];
            }
            if (idx === emptyIndex - 12) {
                [newBoard[idx], newBoard[idx + 4], newBoard[idx + 8], newBoard[emptyIndex]] = [newBoard[emptyIndex], newBoard[idx], newBoard[idx + 4], newBoard[idx + 8]];
            }
            if (idx === emptyIndex + 12) {
                [newBoard[idx], newBoard[idx - 4], newBoard[idx - 8], newBoard[emptyIndex]] = [newBoard[emptyIndex], newBoard[idx], newBoard[idx - 4], newBoard[idx - 8]];
            }
            setBoard(newBoard);
        }
        if (exception) {
            if (((0 <= idx && idx <= 3) && (0 <= emptyIndex && emptyIndex <= 3)) || 
                ((4 <= idx && idx <= 7) && (4 <= emptyIndex && emptyIndex <= 7)) ||
                ((8 <= idx && idx <= 11) && (8 <= emptyIndex && emptyIndex <= 11)) || 
                ((12 <= idx && idx <= 15) && (12 <= emptyIndex && emptyIndex <= 15))) {
                if (idx === emptyIndex - 1 || idx === emptyIndex + 1) {
                    [newBoard[idx], newBoard[emptyIndex]] = [newBoard[emptyIndex], newBoard[idx]];
                }
                if (idx === emptyIndex - 2) {
                    [newBoard[idx], newBoard[idx + 1], newBoard[emptyIndex]] = [newBoard[emptyIndex], newBoard[idx], newBoard[idx + 1]];
                }
                if (idx === emptyIndex + 2) {
                    [newBoard[idx], newBoard[idx - 1], newBoard[emptyIndex]] = [newBoard[emptyIndex], newBoard[idx], newBoard[idx - 1]];
                }
                if (idx === emptyIndex - 3) {
                    [newBoard[idx], newBoard[idx + 1], newBoard[idx + 2], newBoard[emptyIndex]] = [newBoard[emptyIndex], newBoard[idx], newBoard[idx + 1], newBoard[idx + 2]];
                }
                if (idx === emptyIndex + 3) {
                    [newBoard[idx], newBoard[idx - 1], newBoard[idx - 2], newBoard[emptyIndex]] = [newBoard[emptyIndex], newBoard[idx], newBoard[idx - 1], newBoard[idx - 2]];
                }
                setBoard(newBoard);
            }
        }
    };

    const handleClick = () => {
        for (let i = 0; i < 5; i++) {
            const randomIndex = Math.floor(Math.random() * board.length);
            handleTileClick(randomIndex);
        }
    };

    return (
        <div className='퍼즐'>
            <div>
                <button onClick={handleClick}>셔플</button>
            </div>
            <div className="퍼즐-컨테이너">
                {board.map((value, idx) => {
                    return (
                        <div key={idx} className={`퍼즐-조각 ${value === null ? '빈칸' : ''}`}
                            onClick={() => handleTileClick(idx)}>{value + 1}</div>
                    );
                })}
            </div>
        </div>
    );
};

export default Puzzle;
