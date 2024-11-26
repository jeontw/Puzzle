import React, { useState, useRef, useEffect } from 'react';

const Puzzle = ({set기록,기록, seconds, setSeconds, level, setlevel}) => {
    const audio = new Audio('/Woosh.mp3');
    const audio2 = new Audio('/Tiny.mp3');
    const [유효타일, set유효타일] = useState(true);
    const [퍼즐판, set퍼즐판] = useState([]);
    const [전체화면, set전체화면] = useState(false);
    const [셔플유무, set셔플유무] = useState(false);
    const [타이머, set타이머] = useState(false);


    //리셋 버튼
    const reset = ()=>{
        set유효타일(true);
        set퍼즐판([...Array(level * level - 1).keys(), null]);
        set전체화면(false);
        set셔플유무(false);
        set타이머(false);
        set이미지([]);
        setSeconds(0);
        set업로드(null);
    }
    //타이머 관련
    useEffect(() => {
        let interval;

        if (타이머) {
            interval = setInterval(() => {
                setSeconds(prevSeconds => prevSeconds + 0.1);
            }, 100);
        }
        return () => clearInterval(interval);
    }, [타이머, setSeconds]);

    useEffect(() => {
        setSeconds(0);
        set타이머(false);
        set퍼즐판([...Array(level * level - 1).keys(), null]);
    }, [기록,level, setSeconds]);

    //타일이동 로직 관련 최적화를 위해 코드가 길어짐
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
            return
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
                return
            }
        }
        else {
            return
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
        set셔플유무(true);
    };

    const 타일클릭 = (idx) => {
        if (셔플유무) {
            const 빈칸idx = 퍼즐판.indexOf(null);
            타일이동(idx, 빈칸idx, 퍼즐판);
            set타이머(true);
            승리확인();
            audio.play();
        }
        else{
            셔플시작();
        }
    };

    const 승리확인 = () => {
        const 승리판 = [...Array(level * level - 1).keys(), null];
        if (JSON.stringify(퍼즐판) === JSON.stringify(승리판)) {
            set타이머(false);
            set기록(true);
            set유효타일(true)
            audio2.play();
            set셔플유무(false);
        }
    };

    //화면 전환
    const handleFullscreen = () => {
        document.documentElement.requestFullscreen();
        set전체화면(true);
    };

    const handleExitFullscreen = () => {
        if (document.exitFullscreen) {
            document.exitFullscreen();
            set전체화면(false);
        }
    };

    //이미지 관련
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

            context.drawImage(img, 0, 0, 크기, 크기);

            const 새로운조각 = [];
            const 조각크기 = 크기 / level;

            for (let y = 0; y < level; y++) {
                for (let x = 0; x < level; x++) {
                    if (y === level - 1 && x === level - 1) continue;

                    const pieceImageData = context.getImageData(x * 조각크기,y * 조각크기, 조각크기, 조각크기);
                    새로운조각.push(pieceImageData);
                }
            }
            set이미지(새로운조각);
            handleFullscreen();
        };

        img.src = 업로드;
    }, [업로드, level]);

    useEffect(()=> {
        set셔플유무(false)
    },[level])


    return (
        <div className='퍼퍼퍼'>
            <div>
                <div>
                    <button onClick={handleFullscreen}>Fullscreen</button>
                    {전체화면 && (<button className='나가기' onClick={handleExitFullscreen}>X</button>)}
                    <button onClick={() => { audio2.play(); setlevel(3);}}>3x3</button>
                    <button onClick={() => { audio2.play(); setlevel(4);}}>4x4</button>
                    <button onClick={() => { audio2.play(); setlevel(5);}}>5x5</button>
                    <button onClick={셔플시작}>Shuffle</button>
                    <button onClick={()=>set셔플유무(true)}>ShuffleX</button>
                </div>
                <div className='퍼즐'>
                    <canvas ref={ref} style={{ display: 'none' }} />
                    <div
                        className='퍼즐-컨테이너'
                        style={{ gridTemplateColumns: `repeat(${level}, 1fr)`, gap: '1px' }}
                    >
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
                <div>
                    <img src={업로드} alt='' style={{ width: '200px', height: '200px', objectFit: 'cover' }} />
                    <input className='파일선택' type="file" accept="image/*" onChange={handleImageUpload} />
                </div>
                <h1>Timer: {seconds.toFixed(1)}s</h1>
                <button onClick={reset}>Reset</button>
            </div>
        </div>
    );
};

export default Puzzle;