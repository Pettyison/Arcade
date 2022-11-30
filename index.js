const players = ['O', 'X'];
const gameBoard = [
    '', '', '',
    '', '', '',
    '', '', ''
];
let currentPlayer;
let gameBoardElem;

const titleElem = document.createElement('h1');
titleElem.textContent = 'Tic Tac Toe';
document.body.appendChild(titleElem);



const createGameBoardElem = () => {
    const gameBoardElem = document.createElement('div');
    gameBoardElem.classList.add('game-board');
    return gameBoardElem;
};

const createSquareElem = squareNum => {
    const squareElement = document.createElement('div');

    squareElement.classList.add('game-square');

    squareElement.addEventListener('click', (event) => {
        const {target} = event;
        target.textContent = currentPlayer;
        gameBoard[squareNum] = currentPlayer;
        checkBoard();
        changePlayer();
    },
    {once: true }
    );

    return squareElement;
};

let inBtn = document.querySelector('#playerSubmit');
inBtn.addEventListener('submit', (e) => {
    e.preventDefault();
    let p1 = document.getElementById('p1').value;
    let p2 = document.getElementById('p2').value;
    document.getElementById('displayp1').innerHTML = 'X = ${p1}';
    document.getElementById('displayp2').innerHTML = 'O = ${p2}';
})




const changePlayer = () => {
    if (currentPlayer === players[0]) {
        currentPlayer = players[1];
    } else {
        currentPlayer = players[0]
    }
};

const checkBoard = () => {
    const winningStates =[
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
    ]
    for (let winState of winningStates) {
        const [position1, position2, position3] = winState;
        if (gameBoard[position1] !== '' &&
            gameBoard[position1] === gameBoard[position2] && 
            gameBoard[position1] === gameBoard[position3]
            ) {
                endGame(`${gameBoard[position1]}'s wins`);
                return;
            }
    }
    const allSquaresUsed = gameBoard.every(square => square !== '');
    if (allSquaresUsed) {
        endGame(`DRAW`);
  }
};

const endGame = message => {
    const overlayElem = document.createElement('div');
    overlayElem.style.position = 'fixed';
    overlayElem.style.top = '0';
    overlayElem.style.bottom = '0';
    overlayElem.style.right = '0';
    overlayElem.style.left = '0';
    overlayElem.style.backgroundColor = 'rgba(0,0,0,0.8)';
    overlayElem.style.display = 'flex';
    overlayElem.style.flexDirection = 'column';
    overlayElem.style.justifyContent= 'center';
    overlayElem.style.alighItems= 'center';
    overlayElem.style.textAlign= 'center';

    const messageElem = document.createElement('h2')
    messageElem.textContent = message;
    messageElem.style.color = "red";
    messageElem.style.fontSize = '100px';

    overlayElem.appendChild(messageElem);

    const restartBtn = document.createElement('button');
    restartBtn.textContent = 'Go Again';
    restartBtn.style.backgroundColor = 'transparent';
    restartBtn.style.color = 'red';
    restartBtn.style.border = '3px solid red';
    restartBtn.style.padding = '10px 30px';
    restartBtn.style.fontSize = '30px';

    restartBtn.addEventListener('click', () => {
        restartGame();
        document.body.removeChild(overlayElem);
    });

    overlayElem.appendChild(restartBtn);

    document.body.appendChild(overlayElem);
};


const restartGame = () => {
    if(gameBoardElem){
        document.body.removeChild(gameBoardElem);
    }
    gameBoardElem = createGameBoardElem();

    for(let square = 0; square < 9; square++) {
        gameBoardElem.appendChild(createSquareElem(square));
    }
    currentPlayer = players[0];
    gameBoard.fill('');
    document.body.appendChild(gameBoardElem)
};

restartGame();

