import React, { useState } from 'react';
import "./Puzzle.css"

const Puzzle = ({setIsActive, isButtonVisible, setIsButtonVisible}) => {
    const [board, setBoard] = useState(createBoard());
    const [isShuffling, setIsShuffling] = useState(false);




    function createBoard() {
        const numbers = [...Array(15).keys(), null];
        return numbers;
    }

    const moveTile = (idx, emptyIndex, newBoard) => {
        const isAdjacent = (idx === emptyIndex - 4 || idx === emptyIndex + 4 || idx === emptyIndex - 8 || idx === emptyIndex + 8 || idx === emptyIndex - 12 || idx === emptyIndex + 12);
        const exception = (idx === emptyIndex - 1 || idx === emptyIndex + 1 || idx === emptyIndex - 2 || idx === emptyIndex + 2 || idx === emptyIndex - 3 || idx === emptyIndex + 3);

        if (isAdjacent) {
            if (idx === emptyIndex - 4 || idx === emptyIndex + 4) {
                [newBoard[idx], newBoard[emptyIndex]] = [newBoard[emptyIndex], newBoard[idx]];
            } else if (idx === emptyIndex - 8) {
                [newBoard[idx], newBoard[idx + 4], newBoard[emptyIndex]] = [newBoard[emptyIndex], newBoard[idx], newBoard[idx + 4]];
            } else if (idx === emptyIndex + 8) {
                [newBoard[idx], newBoard[idx - 4], newBoard[emptyIndex]] = [newBoard[emptyIndex], newBoard[idx], newBoard[idx - 4]];
            } else if (idx === emptyIndex - 12) {
                [newBoard[idx], newBoard[idx + 4], newBoard[idx + 8], newBoard[emptyIndex]] = [newBoard[emptyIndex], newBoard[idx], newBoard[idx + 4], newBoard[idx + 8]];
            } else if (idx === emptyIndex + 12) {
                [newBoard[idx], newBoard[idx - 4], newBoard[idx - 8], newBoard[emptyIndex]] = [newBoard[emptyIndex], newBoard[idx], newBoard[idx - 4], newBoard[idx - 8]];
            }
            return true;
        }
        if (exception) {
            if (((0 <= idx && idx <= 3) && (0 <= emptyIndex && emptyIndex <= 3)) ||
                ((4 <= idx && idx <= 7) && (4 <= emptyIndex && emptyIndex <= 7)) ||
                ((8 <= idx && idx <= 11) && (8 <= emptyIndex && emptyIndex <= 11)) ||
                ((12 <= idx && idx <= 15) && (12 <= emptyIndex && emptyIndex <= 15))) {
                if (idx === emptyIndex - 1 || idx === emptyIndex + 1) {
                    [newBoard[idx], newBoard[emptyIndex]] = [newBoard[emptyIndex], newBoard[idx]];
                } else if (idx === emptyIndex - 2) {
                    [newBoard[idx], newBoard[idx + 1], newBoard[emptyIndex]] = [newBoard[emptyIndex], newBoard[idx], newBoard[idx + 1]];
                } else if (idx === emptyIndex + 2) {
                    [newBoard[idx], newBoard[idx - 1], newBoard[emptyIndex]] = [newBoard[emptyIndex], newBoard[idx], newBoard[idx - 1]];
                } else if (idx === emptyIndex - 3) {
                    [newBoard[idx], newBoard[idx + 1], newBoard[idx + 2], newBoard[emptyIndex]] = [newBoard[emptyIndex], newBoard[idx], newBoard[idx + 1], newBoard[idx + 2]];
                } else if (idx === emptyIndex + 3) {
                    [newBoard[idx], newBoard[idx - 1], newBoard[idx - 2], newBoard[emptyIndex]] = [newBoard[emptyIndex], newBoard[idx], newBoard[idx - 1], newBoard[idx - 2]];
                }
                return true;
            }
        }
        return false;
    };

    const handleTileClick = (idx) => {
        if (isShuffling) return;
        
        const emptyIndex = board.indexOf(null);
        const newBoard = [...board];
        
        if (moveTile(idx, emptyIndex, newBoard)) {
            setBoard(newBoard);
            setIsActive(true);
            Win(newBoard);
        }
    };

    const getValidMoves = (emptyIndex) => {
        const validMoves = [];
        for (let i = 0; i < 16; i++) {
            if (i !== emptyIndex) {
                const testBoard = [...board];
                if (moveTile(i, emptyIndex, testBoard)) {
                    validMoves.push(i);
                }
            }
        }
        return validMoves;
    };

    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const shuffleBoard = async () => {
        setIsShuffling(true);
        let newBoard = [...board];
        for (let i = 0; i < 100; i++) {
            const emptyIndex = newBoard.indexOf(null);
            const validMoves = getValidMoves(emptyIndex);
            const randomMove = validMoves[Math.floor(Math.random() * validMoves.length)];
            moveTile(randomMove, emptyIndex, newBoard);
            setBoard([...newBoard]);
            await sleep(10); // 0.01초 대기
        }
        setIsShuffling(false);
        setIsActive(true);
    };

    const handleClick = () => {
        if (!isShuffling) {
            shuffleBoard();
        }
        setIsButtonVisible(false)

    };

    const Win = (currentBoard) => {
        const winningBoard = [...Array(15).keys(), null];
        if (JSON.stringify(currentBoard) === JSON.stringify(winningBoard)) {
            console.log('승리!');
            setIsActive(false);
        }
    };


    

    return (
        <div className='퍼즐'>
            {isButtonVisible ? (
                <button
                    className='btn'
                    onClick={handleClick}
                    disabled={isShuffling}
                >
                    {isShuffling ? '셔플 중...' : '게임시작'}
                </button>
            ) : null}
            <div className='퍼즐-컨테이너'>
                {board.map((value, idx) => (
                    <div
                        className={`퍼즐-조각 ${value === null ? '빈칸' : ''}`}
                        key={idx}

                        onClick={() => handleTileClick(idx)}
                    >
                        {value !== null ? value + 1 : ''}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Puzzle;