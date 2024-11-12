import React from "react";
import Data from "./Data";
import New from "./New";
function NxN({input, seconds, level, 기록하기 }) {
    return (
        <div>
            <div className="랭킹">
                {level === 3 && <New seconds={seconds} input={input} 기록하기={기록하기} level={level} />}
                {level === 4 && <New seconds={seconds} input={input} 기록하기={기록하기} level={level} />}
                {level === 5 && <New seconds={seconds} input={input} 기록하기={기록하기} level={level} />}
            </div>
            <div className="기록">
                {level === 3 && <Data seconds={seconds} 기록하기={기록하기} level={level} />}
                {level === 4 && <Data seconds={seconds} 기록하기={기록하기} level={level} />}
                {level === 5 && <Data seconds={seconds} 기록하기={기록하기} level={level} />}
            </div>
        </div>
    );
}

export default NxN;