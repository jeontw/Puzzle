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

    return (
        <div>
            <div>기록 - 평균
                {seconds.toFixed(1)}s
                <input type="text" value={input} onChange={change} placeholder="플레이어 이름을 입력하세요." />
                <button onClick={등록}>등록</button> -
                {records.map((record, idx) => (
                    <p key={idx}>
                        {idx + 1}. --nXn---
                        {record.time.toFixed(1)}s ----
                        {record.name} ----
                        {new Date().toLocaleDateString()}
                    </p>
                ))}
            </div>
        </div>
    );
}
