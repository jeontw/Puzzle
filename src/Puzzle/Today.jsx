import React, { useState } from "react";

export default function Today({ seconds }) {
    const [records, setRecords] = useState([]);
    const [input, setInput] = useState('');

    function 등록() {
        // 새로운 기록을 추가할 때 이름과 seconds 값을 함께 저장
        setRecords((prevRecords) => {
            return [{ name: input, time: seconds }, ...prevRecords];
        });
        setInput('');
    }

    const change = (e) => {
        setInput(e.target.value);
    };
    //로컬 Ranking 삭제 업데이트 기능 있어야함,,,,,게임시작 누르면 자동으로f11 누르게 하고
    return (
        <div>
            <div>평균 - 기록
                {seconds.toFixed(1)}s
                <input type="text" value={input} onChange={change} placeholder="플레이어 이름을 입력하세요." />
                <button onClick={등록}>등록</button> -
                {records.map((record, idx) => (
                    <div className="나의기록" key={idx}>
                        {idx + 1}. --nXn---
                        {record.time.toFixed(1)}s ----
                        {record.name} ----
                        {new Date().toLocaleDateString()}
                    </div>
                ))}
            </div>
        </div>
    );
}
