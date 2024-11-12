import React, { useState, useEffect } from "react";

export default function Data({ seconds, level, 기록하기 }) {
    const [records, setRecords] = useState([]);

    useEffect(() => {
        if (기록하기) {
            const newRecord = { time: seconds, lv: level };
            setRecords((prevRecords) => {
                // 새로운 기록을 기존 기록 앞에 추가
                const updatedRecords = [newRecord, ...prevRecords];
                // 기록이 5개 이상이면, 가장 오래된 기록을 삭제
                if (updatedRecords.length > 5) {
                    updatedRecords.pop(); // 가장 마지막 기록을 제거
                }
                return updatedRecords;
            });
        }
    }, [seconds, level]); // 기록하기, seconds, level을 의존성 배열에 추가

    return (
        <div>
            <div>{level}X{level} 최근 5 게임 평균</div>
            {records.map((record, idx) => (
                <div className="나의기록" key={idx}>
                    {idx + 1}. 종목.{record.lv}X{record.lv} 기록: {record.time.toFixed(1)}초 날짜: 
                    {new Date().toLocaleDateString()}
                </div>
            ))}
        </div>
    );
}
