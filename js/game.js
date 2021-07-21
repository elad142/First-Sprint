'use strict'
const MINE = '💥';
var FLOOR = '⬜';


var gCell;

var gBoard = {
    minesAroundCount: 4,
    isShown: true,
    isMine: false,
    isMarked: true,
}

var gLevel = {
    size: 4,
    MINES: 2
};
var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}
function initGame() {
    gBoard = buildBoard()
    renderBoard(gBoard, '.board-container')
    gGame.isOn = true;
}


function buildBoard() {
    var SIZE = 4;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FLOOR;
            gLevel.isShown = true;
        }
    }
    board[0][0] = MINE;
    board[3][3] = MINE;
    var newBoard = setMinesNegsCount(board)
    // console.log(newBoard);
    return newBoard;
}

function renderBoard(mat, selector) {
    var strHTML = '<table><tbody>';
    for (var i = 0; i < mat.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < mat[0].length; j++) {
            var cell = mat[i][j];
            var className = 'cell';
            var cellId = i + '-' + j;
            strHTML += '<td  onclick="' + "cellClicked() " + '" id = " ' + cellId + ' "  class="' + className + '"> ' + cell + ' </td>'
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>';
    // var elCell = document.querySelector("td.cell = 'cellId'")
    var elContainer = document.querySelector(selector);
    elContainer.innerHTML = strHTML;
}

function setMinesNegsCount(board) {
    var newBoard = copyMat(board);
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            if (board[i][j] === MINE) continue;
            newBoard[i][j] = (mineNegCount(i, j, board) === 0) ? FLOOR : mineNegCount(i, j, board);

            // NEED TO ADD MORE CONDITIONS FOR NUMBER OF MINE NEGS ON FLOOR:
            // } else if (board[i][j] === ) newBoard[i][j] = '';
        }
    }
    return newBoard;
}

function mineNegCount(cellI, cellJ, mat) {
    var minesNegCount = 0;
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= mat.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue;
            if (j < 0 || j >= mat[i].length) continue;
            var currCell = mat[i][j]
            if (currCell === MINE) minesNegCount++;
        }
    }
    return minesNegCount;
}

function cellClicked(elCell, i, j) {
    // option one press on mine:
    if (gBoard[i][j] === MINE) {
        // Update the data model
        gBoard[i][j] = checkGameOver();
    }
    // (gBoard[i][j] === MINE) ? checkGameOver(true) : checkGameOver(false) ;
}



function cellMarked(elCell) {

}

function checkGameOver() {
    console.log('GAYYYYYYYYYY');
}

function expandShown(board, elCell, i, j) {

}