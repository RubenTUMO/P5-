const words = getWords();
const visibleWords = [];
let currentWord = null;
let currentIndex = -1;
let round = 1;
let timeoutId;
let isFinished = false;
let backgroundMusic;
let startMusic = true;

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    backgroundMusic = loadSound("./assets/sounds/background_music.mp3");
    button = createButton('Restart');
    button.style('font-size', '40px')
    button.style('font-family', 'monospace')
    button.style('font-weight', 'bold')
    button.style('border-radius', '10px')
    button.position(window.innerWidth/2 - BUTTONX/2, window.innerHeight/2 - button.height/2 - BUTTONY/2);
    button.size(BUTTONX,BUTTONY);
    button.mousePressed(reloadPage);
    button.hide()
    play();
}

function mousePressed() {
    if(startMusic) {
        backgroundMusic.play();
        startMusic = false;
    }
}

function draw() {
    background(BACKGROUD_COLOR);
    fill(WORD_COLOR);
    textFont('Monospace', 20);
    textStyle(BOLD);
    for (let word of visibleWords) {
        const visibleText = word === currentWord ? word.text.slice(currentIndex): word.text;
        if (word === currentWord && currentIndex > 0) {
            fill('#539165');
             // Change the color to green for the correctly typed word
        } else {
            fill(WORD_COLOR);
        }
        text(visibleText, word.x, Math.floor(word.y));
        word.y += WORD_SPEED;
    }

    const [firstWord] = visibleWords;
    if (visibleWords.length && firstWord.y > height) {
        lose();
    }

}

function hideButton() {
    if (win() || lose()) {
      button.show();
    } else {
      button.hide();
    }
}
function keyTyped() {
    checkLetter(key);
}

function reloadPage() {
    location.reload();
}

function checkLetter(letter) {
    if (!currentWord) {
        selectWord(letter);
    } else {
        checkWordNextLetter(letter);
    }

    if (currentWord.text.length === currentIndex) {
        visibleWords.splice(visibleWords.indexOf(currentWord), 1);
        currentWord = null;
        currentIndex = -1;
    }
}

function selectWord(letter) {
    const word = visibleWords.find(item => {
        const [firstLetter] = item.text;
        return firstLetter === letter;
    });
    currentWord = word;
    currentIndex = 1;
}

function checkWordNextLetter(letter) {
    const expectedNextLetter = currentWord.text.charAt(currentIndex);
    if (letter === expectedNextLetter) {
        currentIndex++;
    }
}

function getWords() {
    const words = WORDS.filter(word => word.length <= MAX_LETTER_COUNT)

    return words.map((word) => ({
        text: word,
        x: Math.random() * MAX_WORD_X,
        y: 0,
    }));
}

function play() {
    let spawningInterval = INITIAL_SPAWNING_INTERVAL;
    function loop() {
        timeoutId = setTimeout(() => {
            addWord();
            if(spawningInterval > MIN_SPAWNING_INTERVAL) {
                spawningInterval -= SPAWNING_INTERVAL_ACCELERATION;
            }
            if(!isFinished) {
                timeoutId = setTimeout(loop, spawningInterval);
            }
        }, spawningInterval);
    }
    loop();
}

function addWord() {
    if(!words.length) {
        if(round < MAX_ROUNDS) {
            words.push(...getWords());
            round++;
        } else if(!visibleWords.length){
            win();
        }
    } else {
        visibleWords.push(words.pop());
    }
}
function finish() {
    isFinished = true;
    clearTimeout(timeoutId);
    noLoop();
}
function win() {
    finish();
    alert("You won");
    button.show();
}

function lose() {
    finish();
    alert("You lost");
    button.show();
}
