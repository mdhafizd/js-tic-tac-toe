/*  A simple Tic-Tac-Toe game
Players 'X' and 'O' take turn inputing their position on the command line using numbers 1-9
1 | 2 | 3
---------
4 | 5 | 6
---------
7 | 8 | 9
*/

// importing user import library
// missed ({sigint: true});
const prompt = require('prompt-sync')({sigint: true});

let board = {
    1: 1, 2: 2, 3: 3,
    4: 4, 5: 5, 6: 6,
    7: 7, 8: 8, 9: 9
};
// TODO: update the gameboard with the user input
function markBoard(position, mark) {
    return board[position] = mark;

}

// TODO: print the game board as described at the top of this code skeleton
function printBoard() {

    console.log(' '+
         board[1] + ' | ' + board[2] + ' | ' + board[3] + '\n' +
        ' --------- \n' +
       ' ' +  board[4] + ' | ' + board[5] + ' | ' + board[6] + '\n' +
        ' --------- \n' +
        ' ' + board[7] + ' | ' + board[8] + ' | ' + board[9] + '\n');


}


// TODO: check for wrong input, this function should return true or false.
// true denoting that the user input is correct
// you will need to check for wrong input (user is entering invalid position) or position is out of bound
// another case is that the position is already occupied
function validateMove(position) {

     //  to check length of input, if it's more than one, it will return false
     if(position.length == 1 && position !== ' ') {
        //  to check input is between 1 to 9
        if(Number(position) >=1 && Number(position) <= 9 ) {
            if(board[position] !== 'X' && board[position] !== 'O'){
                return true;
            } else{
                return false;
            }
        } else {
                return false;
        }
    } else {
        return false;
    }

}

// TODO: list out all the combinations of winning, you will neeed this
// one of the winning combinations is already done for you
let winCombinations = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
];

// TODO: implement a logic to check if the previous winner just win
// This method should return with true or false
function checkWin(player) {

    
    for(let i=0; i<winCombinations.length; i++){ 
        for(let j=0; j<winCombinations[i].length; j++){
          if(j > 0){
              break;
          } else if(board[winCombinations[i][j]] === player 
                      && board[winCombinations[i][j+1]] === player 
                          && board[winCombinations[i][j+2]] === player){
                              return true;           
          }                 
        }
      }
      return false;

}

// TODO: implement a function to check if the game board is already full
// For tic-tac-toe, tie bascially means the whole board is already occupied
// This function should return with boolean
function checkFull() {
    
    for(property in board){
        if(board[property] !== 'X' && board[property] !== 'O'){
            return false;
        } 
    }
    return true;


}

// *****************************************************
// Copy all your code/fucntions in Part 1 to above lines
// (Without Test Cases)
// *****************************************************


// TODO: the main part of the program
// This part should handle prompting the users to put in their next step, checking for winning or tie, etc
function playTurn(player) {

do{
    let position = prompt(player + "'s turn, input: ");
    var cont = false;
   if(validateMove(position)) {
        markBoard(position, player);
        printBoard();
        if(checkWin(player)){
            console.log('Winner: ' + player);
            console.log('End Game');
        } else if(checkFull() === true){
            console.log('The game ended with tie.')
        }
              
   } else if(!validateMove(position)) {        
        printBoard();
        console.log('Wrong input or position has been occupied or input is out of bound.');
        cont = true;
   }

}while(cont);
   
}

// entry point of the whole program
do{

    console.log('Game started: \n\n' +
    ' 1 | 2 | 3 \n' +
    ' --------- \n' +
    ' 4 | 5 | 6 \n' +
    ' --------- \n' +
    ' 7 | 8 | 9 \n');

let winnerIdentified = false
let currentTurnPlayer = 'X'

while (!winnerIdentified){
    
    playTurn(currentTurnPlayer);

    if(checkWin(currentTurnPlayer) || checkFull() === true){
        winnerIdentified = true;
    } else {
        if(currentTurnPlayer === 'X'){
            currentTurnPlayer = 'O';
        } else if(currentTurnPlayer === 'O'){
            currentTurnPlayer = 'X'; 
        }
    }
}   

var play = prompt("Enter 'Y to play again or 'N' to exit the game: ");
for(let i = 1; i<=Object.keys(board).length; i++){
    markBoard(i,i);
}
}while(play == 'Y' || play == 'y')





// Bonus Point: Implement the feature for the user to restart the game after a tie or game over
