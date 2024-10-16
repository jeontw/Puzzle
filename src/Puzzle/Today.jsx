import React from "react";

export default function Today({seconds}){
    return(
        <div>1번호 - {seconds.toFixed(1)} - {new Date().toLocaleDateString()} - <input type="text" placeholder="이름" /><button>등록</button> - --5게임의 평균---</div>
    )
}