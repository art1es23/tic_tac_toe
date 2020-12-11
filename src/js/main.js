
    const getClass = item => document.querySelector(item);
    const getClassAll = item => document.querySelectorAll(item);

    const wrapper = getClass('.cross--wrapper');
    const items = getClassAll('.cross__item');

    console.log(items);
    let origBoard;
    const player1 = 'x'
    const player2 = 'o';
    let firstRun;
    let winLines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [6, 4, 2]
    ]

    getClass('.again').addEventListener('click', () => {
        startGame();
    })

    const startGame = () => {
        getClass('.endGame').style.display = "none";
        origBoard = Array.from(Array(9).keys());
        for (let i = 0; i < items.length; i++) {
            items[i].innerText = '';
            items[i].style.removeProperty('background-color');
            items[i].addEventListener('click', turnClick, false);
        }

    }

    const turnClick = (square) => {
        if (typeof origBoard[square.target.id] === 'number') {
            turn(square.target.id, player1);
            if (!checkTie()) turn(bestSpot(), player2);
        }
    }

    const turn = (squareId, player) => {

        origBoard[squareId] = player;
        document.getElementById(squareId).innerText = player;
        let gameWon = checkWin(origBoard, player);
        if (gameWon) gameOver(gameWon);

    }

    const checkWin = (board, player) => {
        let plays = board.reduce((a, e, i) => (e === player) ? a.concat(i) : a, []);
        let gameWon = null;
        for (let [index, win] of winLines.entries()) {
            if (win.every(elem => plays.indexOf(elem) > -1)) {
                gameWon = {index: index, player: player};
                break;
            }
        }
        return gameWon;
    }

    const gameOver = (gameWon) => {
        for (let index of winLines[gameWon.index]) {
            document.getElementById(index).style.backgroundColor =
                gameWon.player === player1 ? "blue" : "red";
        }
        for (let i = 0; i < items.length; i++) {
            items[i].removeEventListener('click', turnClick, false)
        }
        declareWinner(gameWon.player === player1 ? "You win!" : "You lose.");
    }

    const declareWinner = (who) => {
        getClass('.endGame').style.display = "flex";
        getClass('.endGame .text').innerText = who;
    }

    const emptySquares = () => {
        return origBoard.filter(s => typeof s === 'number');
    }

    const bestSpot = () => {
        return emptySquares()[0];
    }

    const checkTie = () => {
        if (emptySquares().length === 0) {
            for (let i = 0; i < items.length; i++) {
                items[i].style.backgroundColor = 'green';
                items[i].removeEventListener('click', turnClick, false);
            }
            declareWinner("Tie Game!");
            return true;
        }
        return false;
    }

    startGame();

/*
    Array.from(items).forEach(item => {
        item.addEventListener('click', () => {


/!*            let cross = document.createElement("div");
            cross.innerHTML = '<img src="./img/cat.png">';
            cross.classList.add('cross__icon');
            item.appendChild(cross)*!/

        })
    })

*/



/*
const interval = setInterval(nextSlide, 3500)
*/

/*

function slideNext () {
    const slidesVisible = document.querySelectorAll('.slider__item');
    let offset2 = 0;

    for (let i = 0; i < slidesVisible.length; i++) {
        slidesVisible[i].style.left = offset2 * 512 + 512 - 'px';
        offset2++;
    }
}
*/

/*
rightBtn.addEventListener('click', slideNext);
leftBtn.addEventListener('click', slidePrev);

function slideNext(e) {
    e.preventDefault();
}
*/


/*
const ages = [1,2,3,0,4,5,6];

let ar = 0;
for (let i = 0; i < ages.length; i++) {
    if (ages[i] === 0) break;
    ar = ar + ages[i];
    console.log(ages[i]);
}
console.log(ar)
*/



/*let regExp = /^[a-zA-Z]{1,10} [a-zA-Z]{1,20}$/;

console.log(regExp.test('Denys Symak'))*/
/*
const f1 = document.forms['f1'];
*/

/*
const btnAddUser = document.querySelector('.add');
const btnEditUser = document.querySelector('.editUser');
let tableUsers = document.querySelector('.menu');
let tableUsersWrapper = document.querySelector('.menu tbody');

let count = 0;
document.getElementById('tableUsers').addEventListener('click', tableClick,false);

btnAddUser.addEventListener('click', () => {
    let loginValue = f1.login.value;
    let passwordValue = f1.password.value;
    let mailValue = f1.mail.value;

    count++;

    let tableRow = document.createElement('tr');
    tableRow.className = 'menu--wrapper';
    tableRow.innerHTML = `
            <td class="menu__item menu__item--number">${count}</td>
            <td class="menu__item menu__item--login">${loginValue}</td>
            <td class="menu__item menu__item--password">${passwordValue}</td>
            <td class="menu__item menu__item--mail">${mailValue}</td>
            <td class="menu__item menu__item--edit"><button id="edit" value="Edit">Edit</button></td>
            <td class="menu__item menu__item--remove"><button id="remove" value="Remove">Remove</button></td>
        `;
    tableUsersWrapper.appendChild(tableRow);

    f1.login.value = '';
    f1.password.value = '';
    f1.mail.value = '';
})

function deleteRow(row) {
    document.getElementById('tableUsers').deleteRow(row);
}

function editRow(row) {
    let arrayCols = row.querySelectorAll('td');

    let loginCol = arrayCols[1].innerHTML;
    let passwordCol = arrayCols[2].innerHTML;
    let mailCol = arrayCols[3].innerHTML;

    f1.login.value = loginCol;
    f1.password.value = passwordCol;
    f1.mail.value = mailCol;

    btnAddUser.classList.remove('active');
    btnEditUser.classList.add('active');

    btnEditUser.addEventListener('click', () => {
        btnAddUser.classList.add('active');
        btnEditUser.classList.remove('active');

        row.innerHTML = `
            <td class="menu__item menu__item--number">${row.rowIndex}</td>
            <td class="menu__item menu__item--login">${f1.login.value}</td>
            <td class="menu__item menu__item--password">${f1.password.value}</td>
            <td class="menu__item menu__item--mail">${f1.mail.value}</td>
            <td class="menu__item menu__item--edit"><button id="edit" value="Edit">Edit</button></td>
            <td class="menu__item menu__item--remove"><button id="remove" value="Remove">Remove</button></td>
        `;
    })
}

function tableClick(e) {
    if(!e)
        e = window.event;
    if (e.target.value === "Remove") {
        deleteRow( e.target.parentNode.parentNode.rowIndex );
    }

    if (e.target.value === "Edit") {
        editRow(e.target.parentNode.parentNode);
    }
}

*/



/* ---------- 14 -------------
const createEl = document.querySelector('.create');
const coord = document.querySelector('.coord');

createEl.addEventListener('click', function () {
    const valueWidth = f1.width.value;
    const valueHeight = f1.height.value;
    const valueColor = f1.color.value;

    let box = document.createElement("div");
    box.innerHTML = "SUKA";
    box.style.width = f1.width.value + 'px';
    box.style.height = f1.height.value + 'px';
    box.style.backgroundColor = valueColor;

    let wrapper = document.querySelector('.wrapper');
    wrapper.appendChild(box);

    console.log(valueHeight);
    console.log(valueWidth);

})

*/

/* ----------------- 15 -----------------
const createEl = document.querySelector('.add');
let newWord = document.querySelector('.badwords')

createEl.addEventListener('click', function () {
    const word = f1.word.value;

    newWord.innerHTML += word + ', ';

})

const censor = document.querySelector('.censor');

censor.addEventListener('click', (e) => {

    let i;
    let mas = newWord.innerHTML.split(', ');

    let text = f1.textarea.value;
    let CHAR = '*';

    const censored = text
        .split(' ' || ', ')
        .map(item => mas.includes(item) ? CHAR.repeat(item.length) : item)
        .join(' ');

    f1.textarea.value = censored;
    console.log(censored);
})*/

