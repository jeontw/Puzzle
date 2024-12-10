import React, { useState, useRef, useEffect } from 'react';
import LoadingScreen from './load';

const Puzzle = ({set기록,기록, seconds, setSeconds, level, setlevel}) => {
    const audio = new Audio('/Woosh.mp3');
    const audio2 = new Audio('/Tiny.mp3');
    const [isTile, setIsTile] = useState(true);
    const [Map, setMap] = useState([]);
    const [fullScreen, setFullScreen] = useState(false);
    const [isShuffle, setIsShuffle] = useState(false);
    const [타이머, set타이머] = useState(false);


    //리셋 버튼
    const reset = ()=>{
        setIsTile(true);
        setMap([...Array(level * level - 1).keys(), null]);
        setFullScreen(false);
        setIsShuffle(false);
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
        setMap([...Array(level * level - 1).keys(), null]);
    }, [기록,level, setSeconds]);

    //타일이동 로직 관련 최적화를 위해 코드가 길어짐
    const 타일이동 = (idx, nullIdx, Map) => {

        if (idx - nullIdx === level || idx - nullIdx === -level || idx - nullIdx === 2 * level ||
            idx - nullIdx === -2 * level || idx - nullIdx === 3 * level || idx - nullIdx === -3 * level ||
            idx - nullIdx === 4 * level || idx - nullIdx === -4 * level) {

            if (idx === nullIdx - level || idx === nullIdx + level) {
                [Map[idx], Map[nullIdx]] = [Map[nullIdx], Map[idx]];
            }
            else if (idx === nullIdx - level * 2) {
                [Map[idx], Map[idx + level], Map[nullIdx]] =
                    [Map[nullIdx], Map[idx], Map[idx + level]];
            }
            else if (idx === nullIdx + level * 2) {
                [Map[idx], Map[idx - level], Map[nullIdx]] =
                    [Map[nullIdx], Map[idx], Map[idx - level]];
            }
            else if (idx === nullIdx - level * 3) {
                [Map[idx], Map[idx + level], Map[idx + level * 2], Map[nullIdx]] =
                    [Map[nullIdx], Map[idx], Map[idx + level], Map[idx + level * 2]];
            }
            else if (idx === nullIdx + level * 3) {
                [Map[idx], Map[idx - level], Map[idx - level * 2], Map[nullIdx]] =
                    [Map[nullIdx], Map[idx], Map[idx - level], Map[idx - level * 2]];
            }
            else if (idx === nullIdx - level * 4) {
                [Map[idx], Map[idx + level], Map[idx + level * 2], Map[idx + level * 3], Map[nullIdx]] =
                    [Map[nullIdx], Map[idx], Map[idx + level], Map[idx + level * 2], Map[idx + level * 3]];
            }
            else if (idx === nullIdx + level * 4) {
                [Map[idx], Map[idx - level], Map[idx - level * 2], Map[idx - level * 3], Map[nullIdx]] =
                    [Map[nullIdx], Map[idx], Map[idx - level], Map[idx - level * 2], Map[idx - level * 3]];
            }
            return
        }

        if (idx - nullIdx < level || idx - nullIdx < -level) {
            if (((0 <= idx && idx < level) && (0 <= nullIdx && nullIdx < level)) ||
                ((level <= idx && idx < level * 2) && (level <= nullIdx && nullIdx < level * 2)) ||
                ((level * 2 <= idx && idx < level * 3) && (level * 2 <= nullIdx && nullIdx < level * 3)) ||
                ((level * 3 <= idx && idx < level * 4) && (level * 3 <= nullIdx && nullIdx < level * 4)) ||
                ((level * 4 <= idx && idx < level * 5) && (level * 4 <= nullIdx && nullIdx < level * 5))
            ) {
                if (idx === nullIdx - 1 || idx === nullIdx + 1) {
                    [Map[idx], Map[nullIdx]] = [Map[nullIdx], Map[idx]];
                } else if (idx === nullIdx - 2) {
                    [Map[idx], Map[idx + 1], Map[nullIdx]] = [Map[nullIdx], Map[idx], Map[idx + 1]];
                } else if (idx === nullIdx + 2) {
                    [Map[idx], Map[idx - 1], Map[nullIdx]] = [Map[nullIdx], Map[idx], Map[idx - 1]];
                } else if (idx === nullIdx - 3) {
                    [Map[idx], Map[idx + 1], Map[idx + 2], Map[nullIdx]] = [Map[nullIdx], Map[idx], Map[idx + 1], Map[idx + 2]];
                } else if (idx === nullIdx + 3) {
                    [Map[idx], Map[idx - 1], Map[idx - 2], Map[nullIdx]] = [Map[nullIdx], Map[idx], Map[idx - 1], Map[idx - 2]];
                } else if (idx === nullIdx - 4) {
                    [Map[idx], Map[idx + 1], Map[idx + 2], Map[idx + 3], Map[nullIdx]] = [Map[nullIdx], Map[idx], Map[idx + 1], Map[idx + 2], Map[idx + 3]];
                } else if (idx === nullIdx + 4) {
                    [Map[idx], Map[idx - 1], Map[idx - 2], Map[idx - 3], Map[nullIdx]] = [Map[nullIdx], Map[idx], Map[idx - 1], Map[idx - 2], Map[idx - 3]];
                }
                return
            }
        }
        else {
            return
        }

    };
    
    const shuffle = () => {
        for (let i = 0; i < level * 100; i++) {
            if (isTile === true) {
                setTimeout(() => {
                    const nullIdx = Map.indexOf(null);
                    // null이 아닌 타일 중 랜덤 선택
                    let randomIdx;
                    do {
                        randomIdx = Math.floor(Math.random() * Map.length);
                    } while (randomIdx === nullIdx);
                    타일이동(randomIdx, nullIdx, Map);
                    set이미지([...이미지]);
                }, i * 10);
            }
        }
        setIsShuffle(true);
    };

    const 타일클릭 = (idx) => {
        if (isShuffle) {
            const nullIdx = Map.indexOf(null);
            타일이동(idx, nullIdx, Map);
            set타이머(true);
            승리확인();
            audio.play();
        }
        else{
            shuffle();
        }
    };

    const 승리확인 = () => {
        const 승리판 = [...Array(level * level - 1).keys(), null];
        if (JSON.stringify(Map) === JSON.stringify(승리판)) {
            set타이머(false);
            set기록(true);
            setIsTile(true)
            audio2.play();
            setIsShuffle(false);
        }
    };

    //화면 전환
    const handlefullscreen = () => {
        document.documentElement.requestFullscreen();
        setFullScreen(true);
    };

    const handleExitfullscreen = () => {
        if (document.exitfullscreen) {
            document.exitfullscreen();
            setFullScreen(false);
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
            handlefullscreen();
        };

        img.src = 업로드;
    }, [업로드, level]);

    useEffect(()=> {
        setIsShuffle(false)
    },[level])


    return (
        <div className='퍼퍼퍼'>
            <div>
                <LoadingScreen></LoadingScreen>
            </div>
            <div>
                <div>
                    <button onClick={handlefullscreen}>fullscreen</button>
                    {fullScreen && (<button className='나가기' onClick={handleExitfullscreen}>X</button>)}
                    <button onClick={() => { audio2.play(); setlevel(3);}}>3x3</button>
                    <button onClick={() => { audio2.play(); setlevel(4);}}>4x4</button>
                    <button onClick={() => { audio2.play(); setlevel(5);}}>5x5</button>
                    <button onClick={shuffle}>Shuffle</button>
                    <button onClick={()=>setIsShuffle(true)}>ShuffleX</button>
                </div>
                <div className='퍼즐'>
                    <canvas ref={ref} style={{ display: 'none' }} />
                    <div
                        className='퍼즐-컨테이너'
                        style={{ gridTemplateColumns: `repeat(${level}, 1fr)`, gap: '1px' }}
                    >
                        {Map.map((값, idx) => (
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