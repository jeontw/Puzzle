import React, { useState, useRef, useEffect } from 'react';
import "./Puzzle.css";

const Puzzle = ({ seconds, setSeconds }) => {
    const audio = new Audio('/Woosh.mp3');
    const audio2 = new Audio('/Tiny.mp3');
    const audio3 = new Audio('/Good.mp3');
    const [level, setlevel] = useState(4);
    const [유효타일, set유효타일] = useState(true);
    const [퍼즐판, set퍼즐판] = useState([]); // 퍼즐 위치를 위한 숫자 배열



    const [isActive, setIsActive] = useState(false);
    const [intervalId, setIntervalId] = useState(null); // interval ID를 상태로 관리

    useEffect(() => {
        let interval;

        if (isActive) {
            interval = setInterval(() => {
                setSeconds(prevSeconds => prevSeconds + 0.1);
            }, 100);
            setIntervalId(interval); // interval ID를 저장
        }

        return () => clearInterval(interval); // cleanup
    }, [isActive, setSeconds]);


    const handleReset = () => {
        clearInterval(intervalId); // 타이머 정지
        setSeconds(0); // 시간 초기화
        setIsActive(false); // 타이머 비활성화
        setIntervalId(null); // intervalId 초기화
    };

//검색어는 일러스트

    // level이 변경될 때 퍼즐판 초기화
    useEffect(() => {
        set퍼즐판([...Array(level * level - 1).keys(), null]);
    }, [level]);

    const 타일이동 = (idx, 빈칸idx, 퍼즐판) => {

        if (idx - 빈칸idx === level || idx - 빈칸idx === -level || idx - 빈칸idx === 2 * level ||
            idx - 빈칸idx === -2 * level || idx - 빈칸idx === 3 * level || idx - 빈칸idx === -3 * level ||
            idx - 빈칸idx === 4 * level || idx - 빈칸idx === -4 * level) {

            if (idx === 빈칸idx - level || idx === 빈칸idx + level) {
                [퍼즐판[idx], 퍼즐판[빈칸idx]] = [퍼즐판[빈칸idx], 퍼즐판[idx]];
            }
            else if (idx === 빈칸idx - level * 2) {
                [퍼즐판[idx], 퍼즐판[idx + level], 퍼즐판[빈칸idx]] =
                    [퍼즐판[빈칸idx], 퍼즐판[idx], 퍼즐판[idx + level]];
            }
            else if (idx === 빈칸idx + level * 2) {
                [퍼즐판[idx], 퍼즐판[idx - level], 퍼즐판[빈칸idx]] =
                    [퍼즐판[빈칸idx], 퍼즐판[idx], 퍼즐판[idx - level]];
            }
            else if (idx === 빈칸idx - level * 3) {
                [퍼즐판[idx], 퍼즐판[idx + level], 퍼즐판[idx + level * 2], 퍼즐판[빈칸idx]] =
                    [퍼즐판[빈칸idx], 퍼즐판[idx], 퍼즐판[idx + level], 퍼즐판[idx + level * 2]];
            }
            else if (idx === 빈칸idx + level * 3) {
                [퍼즐판[idx], 퍼즐판[idx - level], 퍼즐판[idx - level * 2], 퍼즐판[빈칸idx]] =
                    [퍼즐판[빈칸idx], 퍼즐판[idx], 퍼즐판[idx - level], 퍼즐판[idx - level * 2]];
            }
            else if (idx === 빈칸idx - level * 4) {
                [퍼즐판[idx], 퍼즐판[idx + level], 퍼즐판[idx + level * 2], 퍼즐판[idx + level * 3], 퍼즐판[빈칸idx]] =
                    [퍼즐판[빈칸idx], 퍼즐판[idx], 퍼즐판[idx + level], 퍼즐판[idx + level * 2], 퍼즐판[idx + level * 3]];
            }
            else if (idx === 빈칸idx + level * 4) {
                [퍼즐판[idx], 퍼즐판[idx - level], 퍼즐판[idx - level * 2], 퍼즐판[idx - level * 3], 퍼즐판[빈칸idx]] =
                    [퍼즐판[빈칸idx], 퍼즐판[idx], 퍼즐판[idx - level], 퍼즐판[idx - level * 2], 퍼즐판[idx - level * 3]];
            }

            return set유효타일(true);
        }

        if (idx - 빈칸idx < level || idx - 빈칸idx < -level) {
            if (((0 <= idx && idx < level) && (0 <= 빈칸idx && 빈칸idx < level)) ||
                ((level <= idx && idx < level * 2) && (level <= 빈칸idx && 빈칸idx < level * 2)) ||
                ((level * 2 <= idx && idx < level * 3) && (level * 2 <= 빈칸idx && 빈칸idx < level * 3)) ||
                ((level * 3 <= idx && idx < level * 4) && (level * 3 <= 빈칸idx && 빈칸idx < level * 4)) ||
                ((level * 4 <= idx && idx < level * 5) && (level * 4 <= 빈칸idx && 빈칸idx < level * 5))
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
        else {
            return set유효타일(false);
        }

    };

    const 셔플시작 = () => {
        for (let i = 0; i < level * 100; i++) {
            if (유효타일 === true) {
                setTimeout(() => {
                    const 빈칸idx = 퍼즐판.indexOf(null);
                    // null이 아닌 타일 중 랜덤 선택
                    let 랜덤idx;
                    do {
                        랜덤idx = Math.floor(Math.random() * 퍼즐판.length);
                    } while (랜덤idx === 빈칸idx);
                    타일이동(랜덤idx, 빈칸idx, 퍼즐판);
                    set이미지([...이미지]);
                }, i * 10);
            }

        }
    };

    const 타일클릭 = (idx) => {
        const 빈칸idx = 퍼즐판.indexOf(null);
        타일이동(idx, 빈칸idx, 퍼즐판);
        setIsActive(true);
        승리확인();
        audio.play();
    };
    //공부
    const 승리확인 = () => {
        const 승리판 = [...Array(level * level - 1).keys(), null];
        if (JSON.stringify(퍼즐판) === JSON.stringify(승리판)) {
            console.log('승리!');
            setIsActive(false);
            audio3.play();
        }
    };







    const [이미지, set이미지] = useState([]); // 퍼즐 조각을 위한 배열
    const [업로드, set업로드] = useState(null);
    const ref = useRef(null);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            set업로드(url);
        }
    };


    useEffect(() => {
        if (!업로드) return;

        const img = new Image();
        img.onload = () => {
            const canvas = ref.current;
            const context = canvas.getContext('2d');
            const 크기 = 500;
            canvas.width = 크기;
            canvas.height = 크기;

            // 원본 이미지 캔버스에 부르기
            context.drawImage(img, 0, 0, 크기, 크기);

            // 픽셀 데이터를 가져와서 도트 효과 적용
            const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;

            // 도트 효과 적용
            const dotSize = 4; // 도트 크기
            for (let y = 0; y < canvas.height; y += dotSize) {
                for (let x = 0; x < canvas.width; x += dotSize) {
                    const index = (y * canvas.width + x) * 4;
                    // 흑백 변환
                    const gray =
                        0.299 * data[index] +
                        0.587 * data[index + 1] +
                        0.114 * data[index + 2];

                    // 도트 크기만큼 같은 색상 적용
                    for (let i = 0; i < dotSize; i++) {
                        for (let j = 0; j < dotSize; j++) {
                            if (y + i < canvas.height && x + j < canvas.width) {
                                const idx = ((y + i) * canvas.width + (x + j)) * 4;
                                data[idx] = gray;
                                data[idx + 1] = gray;
                                data[idx + 2] = gray;
                            }
                        }
                    }
                }
            }

            // 도트 효과가 적용된 이미지 ㅜ르고
            context.putImageData(imageData, 0, 0);

            // 퍼즐 조각 생성 알고리즘
            const 새로운조각 = [];
            const 조각크기 = 크기 / level;

            for (let y = 0; y < level; y++) {
                for (let x = 0; x < level; x++) {
                    if (y === level - 1 && x === level - 1) continue;

                    const pieceImageData = context.getImageData(
                        x * 조각크기,
                        y * 조각크기,
                        조각크기,
                        조각크기
                    );
                    새로운조각.push(pieceImageData);
                }
            }

            set이미지(새로운조각);
        };

        img.src = 업로드;
    }, [업로드, level]);

    const handleFullscreen = () => {
        document.documentElement.requestFullscreen();

    };
    
    const handleExitFullscreen = () => {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    };

    return (
        <div className='퍼퍼퍼'>
            <div>
                <div>
                    <button onClick={handleFullscreen}>game start</button>
                    <button onClick={handleExitFullscreen}>game start</button>
                    <button onClick={() => { audio2.play(); setlevel(3) }}>3x3</button>
                    <button onClick={() => { audio2.play(); setlevel(4) }}>4x4</button>
                    <button onClick={() => { audio2.play(); setlevel(5) }}>5x5</button>
                    <input className='파일선택' type="file" accept="image/*" onChange={handleImageUpload} />
                    <button onClick={셔플시작}>셔플 시작</button>
                </div>
                <div className='퍼즐'>
                    <canvas ref={ref} style={{ display: 'none' }} />
                    <div
                        className='퍼즐-컨테이너'
                        style={{ gridTemplateColumns: `repeat(${level}, 1fr)`, gap: '1px' }}
                    >

                        {/* 값은 배열의 값이고 idx는 고정된 자리 인덱스다 */}
                        {퍼즐판.map((값, idx) => (
                            <div
                                className={`퍼즐-조각 ${값 === null ? '빈칸' : ''}`}
                                key={idx}
                                onClick={() => 타일클릭(idx)}
                            >

                                <h4>{업로드 === null ? 값 + 1 : ''}</h4>

                                {값 !== null && 이미지[값] && (
                                    <canvas
                                        width={500 / level}
                                        height={500 / level}
                                        ref={ref => {
                                            if (ref && 이미지[값]) {
                                                const context = ref.getContext('2d');
                                                context.putImageData(이미지[값], 0, 0);
                                            }
                                        }}
                                    />
                                )}
                            </div>
                        ))}

                    </div>
                </div>
            </div>
            <div className='타이머'>
                <div><h1>이미지</h1></div>
                <h1>Timer: {seconds.toFixed(1)}s</h1>
                <button onClick={handleReset}>기록</button>
            </div>
        </div>
    );
};

export default Puzzle;
