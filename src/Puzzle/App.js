import React from "react"
import { Routes, Route } from "react-router-dom"
import "./App.css"
import Game from "./Game"
import SlidingPuzzle from "./SlidingPuzzle"
export default function App () {
    return(
        <Routes>
            <Route path="/" element={<SlidingPuzzle/>}></Route>
            <Route path="/SlidingPuzzle" element={<Game/>}></Route>
        </Routes>
    )
}