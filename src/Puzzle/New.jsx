import React, { useState, useEffect } from "react";

export default function New({input, seconds, level, 기록하기 }) {
    const [records, setRecords] = useState([]);


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

    // 신기록을 기록할 때 가장 짧은 기록 3개를 업데이트합니다.
    useEffect(() => {
        if (기록하기) {
            const newRecord = { name: input, time: seconds, lv: level };
            setRecords((prevRecords) => {
                // 기존 기록에 새로운 기록을 추가
                const updatedRecords = [...prevRecords, newRecord];
                // time이 짧은 순으로 정렬하고, 상위 3개의 기록만 유지
                const sortedRecords = updatedRecords
                    .sort((a, b) => a.time - b.time)
                    .slice(0, 10); // 10등까지만 유지
                // level에 맞는 키로 localStorage에 저장
                localStorage.setItem(`records_level_${level}`, JSON.stringify(sortedRecords));
                return sortedRecords;
            });
        }
    }, [기록하기]); // input, seconds, level을 의존성 배열에 추가



    return (
        <div>
            <div>{level}X{level} 랭킹top3<button onClick={삭제}>초기화(관리용)</button></div>
            {records.map((record, idx) => (
                <div className="나의기록" key={idx}>
                    {idx + 1}등 {record.lv}X{record.lv} - {record.time.toFixed(1)}s - {record.name} -
                    {new Date().toLocaleDateString()}
                </div>
            ))}
        </div>
    );
}
