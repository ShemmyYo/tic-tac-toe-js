const X_CLASS = 'x'
const O_CLASS = 'o'
const WIN_COMBO = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById("board")
const winningMessageElement = document.getElementById("winningMessage")
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
const restartButton = document.getElementById("restartButton")
let xTurn

startGame()

restartButton.addEventListener("click", startGame)

function startGame() {
    xTurn = true
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(O_CLASS)
        cell.removeEventListener("click", handleClick)
        cell.addEventListener("click", handleClick, {once: true})
    })
    setBoardHoverClass()
    winningMessageElement.classList.remove("show")
}

function handleClick(e) {
    const cell = e.target
    const currentClass = xTurn ? X_CLASS : O_CLASS
    //placeMark
    placeMark(cell, currentClass)
    
    if (checkWin(currentClass)) { //checkForWin
        endGame(false)
    } else if (isDraw()) { //checkForDraw
        endGame(true)
    } else { //SwitchTurns
        swapTurns()
        setBoardHoverClass()
    }    
}

function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = "It's a Draw!"
    } else {
        winningMessageTextElement.innerText = `${xTurn ? "X's" : "O's"} Wins!` 
    } 
    winningMessageElement.classList.add("show")
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS)
    })
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function swapTurns() {
    xTurn = !xTurn
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS)
    board.classList.remove(O_CLASS)
    if (xTurn) {
        board.classList.add(X_CLASS)
    } else {
        board.classList.add(O_CLASS)
    }

}

function checkWin(currentClass) {
    return WIN_COMBO.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}