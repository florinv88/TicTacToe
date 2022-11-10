import { useContext, useEffect, useState } from 'react'
import { GameContext } from '../contexts/gamesContext';

const Box = ({ oIcon, xIcon, idx }) => {

    const [refresh, setRefresh] = useState(false)


    const {
        playerPick,
        matrix,
        CPUfirstMove,
        setCPUfirstMove,
        updateMatrix,
        winnerGame,
        updateWinner
    } = useContext(GameContext)



    //Calculate the position of the box in the matrix
    let poz;
    let line;
    if (idx >= 1 && idx <= 3) { poz = idx - 1; line = 0 }
    else
        if (idx >= 4 && idx <= 6) { poz = idx - 4; line = 1 }
        else
            if (idx >= 7 && idx <= 9) { poz = idx - 7; line = 2 }


    //Function to check if there is any posibility to win for CPU

    const checkMove = (symbol) => {

        //test each row
        for (let i = 0; i < 3; i++) {
            let rep = 0;
            for (let j = 0; j < 2; j++)
                if (matrix[i][j] === matrix[i][j + 1] && matrix[i][j] === symbol) rep++;
            if (rep === 1) {
                if (!matrix[i][0] && matrix[i][1] !== null && matrix[i][2] !== null) {
                    return {
                        line: i,
                        poz: 0

                    }
                }
                else
                    if (!matrix[i][1] && matrix[i][0] !== null && matrix[i][2] !== null) {
                        return {
                            line: i,
                            poz: 1

                        }
                    }
                    else {
                        if (!matrix[i][2])
                            return {
                                line: i,
                                poz: 2

                            }
                    }

            }

        }

        //test each column
        for (let i = 0; i < 3; i++) {
            let rep = 0;

            for (let j = 0; j < 2; j++)
                if (matrix[j][i] === matrix[j + 1][i] && matrix[j][i] === symbol) rep++;
            if (rep === 1) {
                if (!matrix[0][i] && matrix[1][i] !== null && matrix[2][i] !== null) {
                    return {
                        line: 0,
                        poz: i
                    }
                }
                else if (!matrix[1][i] && matrix[0][i] !== null && matrix[2][i] !== null) {
                    return {
                        line: 1,
                        poz: i
                    }
                }
                else
                    if (!matrix[2][i]) return {
                        line: 2,
                        poz: i
                    }


            }

        }

        //test diagonals
        //principal
        for (let i = 0; i < 2; i++) {
            let rep = 0;
            if (matrix[i][i] === matrix[i + 1][i + 1] && matrix[i][i] === symbol) rep++;
            if (rep === 1) {
                if (!matrix[0][0] && matrix[1][1] !== null && matrix[2][2] != null) {
                    return {
                        line: 0,
                        poz: 0
                    }
                }
                else
                    if (!matrix[1][1] && matrix[0][0] !== null && matrix[2][2] != null) {
                        return {
                            line: 1,
                            poz: 1
                        }
                    }
                    else if (!matrix[2][2]) return {
                        line: 2,
                        poz: 2
                    }
            }

        }

        //secondary
        if (matrix[0][2] === matrix[1][1] || matrix[1][1] === matrix[2][0] || matrix[0][2] === matrix[2][0]) {
            if (!matrix[0][2] && matrix[1][1] === symbol && matrix[2][0] === symbol) {
                return {
                    line: 0,
                    poz: 2
                }
            }
            else
                if (!matrix[1][1] && matrix[0][2] === symbol && matrix[2][0] === symbol) {
                    return {
                        line: 1,
                        poz: 1
                    }
                }
                else if (!matrix[2][0]) {
                    return {
                        line: 2,
                        poz: 0
                    }
                }

        }

        return null

    }


    //Function to close the game and announce the winner!
    const closeTheGame = () => {

        //test each row
        for (let i = 0; i < 3; i++) {
            let rep = 0;
            for (let j = 0; j < 2; j++)
                if (matrix[i][j] === matrix[i][j + 1] && matrix[i][j] !== null) rep++;
            if (rep === 2) updateWinner(matrix[i][0])

        }

        //test each column
        for (let i = 0; i < 3; i++) {
            let rep = 0;
            for (let j = 0; j < 2; j++)
                if (matrix[j][i] === matrix[j + 1][i] && matrix[j][i] !== null) rep++;
            if (rep === 2) updateWinner(matrix[0][i])

        }

        //test diagonals
        //principal
        let rep = 0;
        for (let i = 0; i < 2; i++) {

            if (matrix[i][i] === matrix[i + 1][i + 1] && matrix[i][i] !== null) rep++;
            if (rep === 2) {
                updateWinner(matrix[0][0])
            }
        }

        //secondary
        if (matrix[0][2] === matrix[1][1] && matrix[1][1] === matrix[2][0] && matrix[1][1] !== null)
            updateWinner(matrix[1][1])


    }



    const cpuMove = () => {

        //CASE CPU FIRST MOVE
        if (CPUfirstMove.valid === true) {
            if (CPUfirstMove.pas1 === true) {
                if (matrix[1][1] === null) {
                    updateMatrix(1, 1, "X")
                    setCPUfirstMove({ valid: true, pas1: false, pas2: true })


                }
                else {
                    if (matrix[0][0] === "X") {
                        updateMatrix(2, 2, "X")
                        setCPUfirstMove({ valid: true, pas1: false, pas2: true })
                    }
                    else
                        if (matrix[0][2] === "X") {
                            updateMatrix(2, 0, "X")
                            setCPUfirstMove({ valid: true, pas1: false, pas2: true })
                        }
                        else
                            if (matrix[2][0] === "X") {
                                updateMatrix(0, 2, "X")
                                setCPUfirstMove({ valid: true, pas1: false, pas2: true })
                            }
                            else {
                                if (matrix[2][2] === "X") {
                                    updateMatrix(0, 0, "X")
                                    setCPUfirstMove({ valid: true, pas1: false, pas2: true })
                                }
                            }

                }

            }
            else {
                if (!winnerGame) {


                    // CHECK IF THERE ARE ANY MOVES FOR CPU TO WIN
                    const a = checkMove("X")
                    if (a) {
                        const { line, poz } = a
                        updateMatrix(line, poz, "X")
                        /* setCPUfirstMove(prevState => {
                             return {
                                 ...prevState,
                                 pas2: !prevState.pas2
                             }
                         })
                         setRefresh(prevState => !prevState)
 */
                    }

                    // CHECK IF THERE ARE ANY MOVES FOR THE PLAYER TO WIN FOR BLOCKING THEM


                    // daca e false //cautare colturi favorabile
                }
            }
        }
    }

    const action = () => {

        //CHECK VALID OPTION
        if (matrix[line][poz] === null) {
            //update the matrix
            updateMatrix(line, poz, playerPick);
            setRefresh(prevState => !prevState)

            //check to see if the user/cpu have won
            closeTheGame();
            //CPU function call to make his move
            cpuMove();
            //check to see if the user/cpu have won
            closeTheGame();
        }
        else {
            alert("You can't select that one , it's not empty !")
        }

    }

    return (
        <div className="box" onClick={action}>
            {matrix[line][poz] &&
                <img src={matrix[line][poz] === "X" ? xIcon : oIcon} alt="icon" />
            }
        </div>
    )
}

export default Box