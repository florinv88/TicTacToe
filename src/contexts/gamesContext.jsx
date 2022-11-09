import { useState, createContext, useEffect } from 'react'

const GameContext = createContext()

const GameContextProvider = ({ children }) => {
    const [playerPick, setPlayerPick] = useState("O")
    const [startGame, setStartGame] = useState(false)
    const [matrix, setMatrix] = useState(null)


    const start = () => {
        setStartGame(true)
        setMatrix([["X", "O", null], [null, "X", "O"], [null, null, "X"]])
    }

    const data = {
        playerPick,
        setPlayerPick,
        startGame,
        setStartGame,
        start,
        matrix, setMatrix
    }
    return (
        <GameContext.Provider value={data}>
            {children}
        </GameContext.Provider >
    )
}



export { GameContextProvider, GameContext }