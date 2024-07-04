game = document.querySelector('.game');
res = document.querySelector('.res');
btn = document.querySelector('.newgame');
field = document.querySelectorAll('.field');
step = false;
count = 0;


circle = `<svg class="circle">
<circle r="45" cx="58" cy="58" stroke="blue" stroke-width="10" fill="none" stroke-linecap="round"/>
</svg>`;
cross = `<svg class="cross">
<line class="first" x1="15" y1="15" x2="100" y2="100" stroke="red" stroke-width="10" stroke-linecap="round"></line>
<line class="second" x1="100" y1="15" x2="15" y2="100" stroke="red" stroke-width="10" stroke-linecap="round"></line>
</svg>`;

function stepCross(target) {
    target.innerHTML = cross;
    target.classList.add('x');
    crossAudio = new Audio('audio/cross.mp3');
    crossAudio.play();
    count++
}

function stepZero(target) {
    target.innerHTML = circle;
    target.classList.add('o');
    circleAudio = new Audio('audio/circle.mp3');
    circleAudio.play();
    count++
}

function init(e) {
    if (!step) stepCross(e.target);
    else stepZero(e.target);
    step = !step;
    win();
}

function newGame() {
    step = false;
    count = 0;
    res.innerText = 'New Game!';
    field.forEach(item => {
        item.innerHTML = '';
        item.classList.remove('x', 'o', 'active');
    });
    playAudio = new Audio('audio/bellstart.mp3');
    playAudio.play();
    game.addEventListener('click', init);
}

function win() {
    let comb = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 0; i < comb.length; i++) {

        if(field[comb[i][0]].classList.contains('x') &&
        field[comb[i][1]].classList.contains('x') &&
        field[comb[i][2]].classList.contains('x')) {
            setTimeout(() => {
                field[comb[i][0]].classList.add('active');
                field[comb[i][1]].classList.add('active');
                field[comb[i][2]].classList.add('active');
                res.innerText = 'The Crosses won!';
                playAudio = new Audio('audio/wavebell.mp3');
                playAudio.play();
            }, 1500);
            game.removeEventListener('click', init);
        }

        else if(field[comb[i][0]].classList.contains('o') &&
        field[comb[i][1]].classList.contains('o') &&
        field[comb[i][2]].classList.contains('o')) {
            setTimeout(() => {
                field[comb[i][0]].classList.add('active');
                field[comb[i][1]].classList.add('active');
                field[comb[i][2]].classList.add('active');
                res.innerText = 'The Circles won!';
                playAudio = new Audio('audio/wavebell.mp3');
                playAudio.play();
            }, 1500);
            game.removeEventListener('click', init);
        }

        else if (count == 9) {
            setTimeout(() => {
                res.innerText = 'Draw!';
                playAudio = new Audio('audio/jump.mp3');
                playAudio.play();
            game.removeEventListener('click', init);
            }, 1500);

        }

    }

}

btn.addEventListener('click', newGame);

game.addEventListener('click', init);

