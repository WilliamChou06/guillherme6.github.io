var origBoard;
const huPlayer = 'O';
const aiPlayer = 'X';
const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2]
];

const boxes = document.querySelectorAll('.box');
startGame();

function startGame() {
    document.querySelector('.endgame').style.display = 'none';
    origBoard = Array.from(Array(9).keys());
    for (var i = 0; i < boxes.length; i++) {
        boxes[i].innerHTML = '';
        boxes[i].style.backgroundColor = '#31a9b8';
        boxes[i].addEventListener('click', turnClick);
    }
}

function turnClick(e) {
    if (typeof origBoard[e.target.id] == 'number') {
        turn(e.target.id, huPlayer);
        for (var i = 0; i < boxes.length; i++) {
            boxes[i].classList.add('disabled');
        }
        setTimeout(function(){
            if (!checkTie()) turn(bestSpot(), aiPlayer);
            for (var i = 0; i < boxes.length; i++) {
                boxes[i].classList.remove('disabled');
            }
        }, 650)
    }

}

function turn(eId, player) {
    origBoard[eId] = player;
    document.getElementById(eId).innerHTML = player;
    let gameWon = checkWin(origBoard, player);
    if (gameWon) gameOver(gameWon);
}

function checkWin(board, player) {
    let plays = board.reduce((a, e, i) => (e === player) ? a.concat(i) : a, []);
    let gameWon = null;
    for (let [index, win] of winCombos.entries()) {
        if (win.every(elem => plays.indexOf(elem) > - 1)) {
            gameWon = { index: index, player: player };
            break;
        }
    }
    return gameWon;
}

function gameOver(gameWon) {
    for (let index of winCombos[gameWon.index]) {
        document.getElementById(index).style.backgroundColor =
            gameWon.player == huPlayer ? 'blue' : 'red';
    }
    for (var i = 0; i < boxes.length; i++) {
        boxes[i].removeEventListener('click', turnClick);
    }
    declareWinner(gameWon.player == huPlayer ? 'You win!' : 'You lose.');
}

function declareWinner(who){
    document.querySelector('.endgame').style.display = 'block';
    document.querySelector('.endgame .text').innerHTML = who;
}

function emptySquares(){
    return origBoard.filter(s => typeof s == 'number');
}

function bestSpot(){
    return emptySquares()[0];
}

function checkTie(){
    if(emptySquares().length == 0){
        for(var i = 0; i < boxes.length; i++){
            boxes[i].style.backgroundColor = 'green';
            boxes[i].removeEventListener('click', turnClick);
        }
        declareWinner('Tie Game!');
        return true;
    }

    return false;
}