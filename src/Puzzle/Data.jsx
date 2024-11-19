import React, { useState, useEffect, useRef } from "react";

export default function Data({ set기록, 기록, seconds, level }) {



    const [records, setRecords] = useState([]);
    const [input, setInput] = useState('');
    const [승리판, set승리판] = useState(false);
    const textRef = useRef();


    // useEffect를 사용해 해당 level에 맞는 records를 불러옵니다.
    useEffect(() => {
        const storedRecords = localStorage.getItem(`records_level_${level}`);
        if (storedRecords) {
            setRecords(JSON.parse(storedRecords));
        }
    }, [level]);

    // 기록을 삭제할 때 해당 level의 기록만 삭제
    const 삭제 = () => {
        setRecords([]); // 모든 기록을 초기화
        localStorage.removeItem(`records_level_${level}`); // 해당 level의 records 제거
    };

    const handleClose = () => {
        if (input.length < 0) {
            textRef.current.focus();
        }
        else{
            set승리판(false);
            setInput('');
        }

    };
    // 입력 값 변경 시 처리
    const change = (e) => {
        setInput(e.target.value);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleClose();
        }
    };


    useEffect(() => {
        if (기록) {
            set기록(false);
            const newRecord = { time: seconds, lv: level };
            setRecords((prevRecords) => {
                // 새로운 기록을 기존 기록 앞에 추가
                const 기록판 = [newRecord, ...prevRecords];
                if (기록판.length > 5) {
                    기록판.pop();
                }
                return 기록판;
            });
        }
    }, [기록, level, seconds, set기록]); // 의존성 배열에 필요한 모든 값 추가

    return (
        <>
            <div className="랭킹">
                {승리판 && (
                    <div className="승리">
                        <div className="승리판">
                            승리!
                            <input
                                type="text"
                                value={input}
                                onChange={change}
                                placeholder="플레이어 이름을 입력하세요."
                                onKeyDown={handleKeyDown}
                                ref={textRef}
                            />
                            <button onClick={handleClose}>나가기</button>
                        </div>
                    </div>
                )}
                <div>{level}X{level} Top 3 Rankings<button onClick={삭제}>랭킹초기화</button></div>
                {records.map((record, idx) => (
                    <div className="나의기록" key={idx}>
                        {idx + 1}등 {record.lv}X{record.lv} - {record.time.toFixed(1)}s - {record.name} -
                        {new Date().toLocaleDateString()}
                    </div>
                ))}
            </div>
            <div className="기록">
                <div>{level}X{level} 최근 5 게임 평균 : 0.0s</div>
                {records.map((record, idx) => (
                    <div className="나의기록" key={idx}>
                        {record.lv}X{record.lv} - {record.time.toFixed(1)}s - {new Date().toLocaleTimeString()}
                    </div>
                ))}
            </div>
        </>
    );
}
