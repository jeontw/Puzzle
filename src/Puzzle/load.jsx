import React, { useState, useEffect } from "react";

const LoadingScreen = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setFadeOut(true);
            setTimeout(() => setIsLoading(false), 1000);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    if (!isLoading) {
        return null;
    }

    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: 'black',
                opacity: fadeOut ? 0 : 1,
                transition: "opacity 1s ease-in-out",
            }}
        >
            <h1>
                <span>L</span>
                <span>o</span>
                <span>a</span>
                <span>d</span>
                <span>i</span>
                <span>n</span>
                <span>g</span>
                &nbsp;Game
            </h1>
            &nsp;
            <h1 style={{
                position: "fixed",
                top: 80,
                left: -15,
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}>로딩 중...</h1>
        </div>
    );
};


export default LoadingScreen;
