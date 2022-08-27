// Constants

const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const WINNING_COMBINATIONS = [
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
const board = document.getElementById('board')
const winningMsgTextElement = document.querySelector('[data-winning-msg-text')
const winningMsgElement = document.getElementById('winningmsg')
const restartButton = document.getElementById('restartBtn')
let circleTurn

// Start Game

startGame()
restartButton.addEventListener('click', startGame)

function startGame() {
    circleTurn = false
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, { once: true })
    });
    setBoardHoverClass()
    winningMsgElement.classList.remove('show')
}

// Handle Click Event

function handleClick(e) {
    const cell = e.target
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
    
    //placeMark

    placeMark(cell, currentClass)
    
    // Check For Win, Check For Draw & Switch Turns

    if (checkWin(currentClass)) {
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    } else {
        swapTurns()
        setBoardHoverClass()
    }
}

//Place Mark

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

// Check Draw & End Game

function endGame(draw) {
    if (draw) {
        winningMsgTextElement.innerText = ' OOPS Draw! '
    } else {
        winningMsgTextElement.innerText  = `${circleTurn ? "O's" : "X's"} Wins!!!`
    }
    winningMsgElement.classList.add('show')
}

function isDraw() {
    return [...cellElements].every(Cell => {
        return Cell.classList.contains(X_CLASS) || Cell.classList.contains(CIRCLE_CLASS)
    })
}

//Swap Turns

function swapTurns() {
    circleTurn = !circleTurn
}

// Hovering Effect

function setBoardHoverClass() {
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    if (circleTurn) {
        board.classList.add(CIRCLE_CLASS)
    } else {
        board.classList.add(X_CLASS)
    }
}

// Check Win

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}