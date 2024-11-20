import React, { useState, useEffect, useRef } from "react";

export default function Data({ set기록, 기록, seconds, level }) {
    const [topRecords, setTopRecords] = useState([]); // Top 5 기록
    const [recentRecords, setRecentRecords] = useState([]); // 최근 5게임 기록
    const [input, setInput] = useState("");
    const [승리판, set승리판] = useState(false);
    const [currentTopRecord, setCurrentTopRecord] = useState(null);
    const textRef = useRef();


    const change = (e) => {
        setInput(e.target.value);
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            handleClose();
        }
    };

    // useEffect로 초기 데이터 로드
    useEffect(() => {
        const storedTopRecords = localStorage.getItem(`records_level_${level}`);
        const storedRecentRecords = localStorage.getItem(`recent_records_level_${level}`);
        if (storedTopRecords) setTopRecords(JSON.parse(storedTopRecords));
        if (storedRecentRecords) setRecentRecords(JSON.parse(storedRecentRecords));
    }, [level]);

    // Top 기록 초기화
    const 삭제 = () => {
        setTopRecords([]);
        setRecentRecords([]);
        localStorage.removeItem(`records_level_${level}`);
        localStorage.removeItem(`recent_records_level_${level}`);
    };

    // 승리판 닫기 및 이름 등록
    const handleClose = () => {
        const updatedRecord = { ...currentTopRecord, name: input };
        const updatedTopRecords = [updatedRecord, ...topRecords]
            .sort((a, b) => a.time - b.time)
            .slice(0, 5); // 최대 5개 유지

        setTopRecords(updatedTopRecords);
        localStorage.setItem(`records_level_${level}`, JSON.stringify(updatedTopRecords));

        set승리판(false);
        setInput("");
        setCurrentTopRecord(null);
    };

    useEffect(() => {
        if (기록) {
            set기록(false);
            const audio3 = new Audio('/Good.mp3');
            const now = new Date();
            const newRecord = {
                time: seconds,
                lv: level,
                name: "",
                date: now.toLocaleDateString(),
                timeStamp: now.toLocaleTimeString(),
            };

            // Top 기록 처리
            const updatedTopRecords = [newRecord, ...topRecords].sort((a, b) => a.time - b.time).slice(0, 5);

            if (updatedTopRecords.includes(newRecord) && updatedTopRecords.indexOf(newRecord) < 5) {
                set승리판(true);
                setCurrentTopRecord(newRecord);
                audio3.play();
            } else {
                setTopRecords(updatedTopRecords);
                localStorage.setItem(`records_level_${level}`, JSON.stringify(updatedTopRecords));
            }

            // 최근 기록 처리
            const updatedRecentRecords = [newRecord, ...recentRecords].slice(0, 5); // 최대 5개 유지
            setRecentRecords(updatedRecentRecords);
            localStorage.setItem(`recent_records_level_${level}`, JSON.stringify(updatedRecentRecords));
        }
    }, [기록, level, seconds, topRecords, recentRecords, set기록]);

    return (
        <>
            <div className="랭킹">
                {승리판 && (
                    <div className="승리">
                        <div className="승리판">
                            <h1>Top 5에 들었습니다!</h1>
                            <input
                                type="text"
                                value={input}
                                onChange={change}
                                placeholder="플레이어 이름을 입력하세요."
                                onKeyDown={handleKeyDown}
                                ref={textRef}
                            />
                            <button onClick={handleClose}>등록</button>
                        </div>
                    </div>
                )}
                <div>
                    {level}X{level} Top 5 Rankings<button onClick={삭제}>랭킹초기화</button>
                </div>
                {topRecords.slice(0, 5).map((record, idx) => (
                    <div className="나의기록" key={idx}>
                        {idx + 1}등 {record.lv}X{record.lv} - {record.time.toFixed(1)}s - {record.name || "익명"} - {record.date}
                    </div>
                ))}
            </div>

            <div className="기록">
                <div>
                    {level}X{level} 최근 5 게임 평균 : {recentRecords.length > 0
                        ? (recentRecords.reduce((acc, record) => acc + record.time, 0) / recentRecords.length).toFixed(1)
                        : "0.0"}
                    s
                </div>
                {recentRecords.map((record, idx) => (
                    <div className="나의기록" key={idx}>
                        {record.lv}X{record.lv} - {record.time.toFixed(1)}s - {record.timeStamp}
                    </div>
                ))}
            </div>
        </>
    );
}
