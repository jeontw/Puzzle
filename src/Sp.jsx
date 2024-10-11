import React from 'react';

function Sp() {
    const handleClick = () => {
        for (let i = 0; i < 100; i++) {
            console.log(`Function executed ${i + 1} times`);
        }
    };

    return (
        <div>
            <button onClick={handleClick}>Click Me</button>
        </div>
    );
}

export default Sp;
