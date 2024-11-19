//get squares and reset button
const squares = document.querySelectorAll('.square');
const resetButton = document.getElementById("reset-button");
let currentPlayer = 'X';//start with player x
let board = [ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',]; //game board 

 

//Fucntions to handle square clicks
squares.forEach((square, index) =>{
    square.addEventListener('click' , ()=>{
        //check if the square is already filled or the game is over
        if (board[index]!== ' ' || checkWinner()) return;
        //fill the square with the current players symbol
        square.textContent = currentPlayer;
        board[index] = currentPlayer;

        //check for a winner
        if (checkWinner()){
            document.getElementById("demo").innerHTML = `${currentPlayer} wins!`;
            }else if (board.every(cell => cell !== ' ')) {
                document.getElementById("demo").innerHTML = "It is a tie!";
            }else{
                //switch players 
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
    });
});

//Function to check for a winner
function checkWinner(){
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return board[a] === currentPlayer && board[b] === currentPlayer && board[c] === currentPlayer;
    });
}

resetButton.addEventListener('click', ()=>{
    board.fill(' ');
    squares.forEach(square => {
        square.textContent = ' ';
    });
    currentPlayer = 'X'; //Reset to player

    document.getElementById("demo").innerHTML = " " ;
})



 