import React, {useState} from "react";

export default function Today({ k }) {


    
    const [names,setNames] = useState([]);
    const [input,setInput] = useState('');



    function 등록() {
        setNames((pre) => {
            return [input, ...pre]
        });
    }




    const change = (e) => {
        setInput(e.target.value);
    }











    return (
        <div>
            <div>이전 결과 - 평균
                {k.toFixed(1)}s -
                {new Date().toLocaleDateString()} -
                <input type="text" value={input} onChange={change} placeholder="플레이어 이름을 입력하세요." />
                <button onClick={등록}>등록</button> -
                {names.map((name, idx) => {
                    return <p key={idx}>
                        {idx+1}.-----
                        {k.toFixed(1)}s----
                        {name}-----
                        {new Date().toLocaleDateString()}
                    </p>
                })}
            </div>
        </div>


    )
}