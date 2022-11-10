import { useState, createContext, useEffect } from 'react'

const GameContext = createContext()

const GameContextProvider = ({ children }) => {

    const [playerPick, setPlayerPick] = useState("O")
    const [startGame, setStartGame] = useState(false)
    const [CPUfirstMove, setCPUfirstMove] = useState({ valid: true, pas1: true, pas2: true, pas3: true })
    const [matrix, setMatrix] = useState([[null, null, null], [null, null, null], [null, null, null]])
    const [winnerGame, setWinnerGame] = useState(null)
    const [winPage, setWinPage] = useState(null)



    const start = () => {
        setStartGame(true)
        setMatrix([[null, null, null], [null, null, null], [null, null, null]])
        if (playerPick === "O") {
            setCPUfirstMove({ valid: true, pas1: true, pas2: true, pas3: true })
            setMatrix([[null, null, null], [null, null, null], [null, null, null]])
            let line = Math.floor(Math.random() * 3)
            let poz = Math.floor(Math.random() * 3)
            if (line === 1) line--;
            if (poz === 1) poz--;
            //update the matrix
            const tempMatrix = matrix
            tempMatrix[line][poz] = "X"
            setMatrix(tempMatrix)
        }
        else {
            setCPUfirstMove({ valid: false, pas1: true, pas2: true })
        }
    }



    const updateWinner = (name) => {
        setWinnerGame(name)
    }

    //Function to update the matrix 
    const updateMatrix = (line, poz, pick) => {
        const tempMatrix = matrix
        tempMatrix[line][poz] = pick
        setMatrix(tempMatrix)

    }




    const data = {
        playerPick,
        setPlayerPick,
        startGame,
        setStartGame,
        start,
        matrix, setMatrix,
        winnerGame, updateWinner,
        setCPUfirstMove, CPUfirstMove,
        updateMatrix,
        setWinPage,
        winPage
    }
    return (
        <GameContext.Provider value={data}>
            {children}
        </GameContext.Provider >
    )
}



export { GameContextProvider, GameContext }