import { Link } from "react-router-dom"

export default function SlidingPuzzle () {
    const handleFullscreen = () => {
        document.documentElement.requestFullscreen();
    };
    return (
        <div>
            <h1>
                <span>S</span>
                <span>l</span>
                <span>i</span>
                <span>d</span>
                <span>i</span>
                <span>n</span>
                <span>g</span>
                &nbsp;Game
            </h1>
            <Link className="Link" to={'/SlidingPuzzle'}><h1 onClick={handleFullscreen}>Game Start</h1></Link>
        </div>
    )
}