let timerRunning = false;
let startTime;
let timeoutID;
let elapsedTime = 0;
let timerInterval;
let currentOll;
let formatTime = (0.00).toFixed(2);

let scrambles = [
    [` F R' F' R U2' F R' F' R2' U2' R' `], // OLL 1
    [` f U R U' R' f' F U R U' R' F' `], // 2
    [` F U R U' R' F' U f U R U' R' f' `], // 3
    [` F U R U' R' F' U' f U R U' R' f' `], // 4
    [` r' U' R U' R' U2' r `], // 5
    [` r U R' U R U2' r' `], // 6
    [` r U2' R' U' R U' r' `], // 7
    [` r' U2' R U R' U r `], // 8
    [` F U R U' R2' F' R U R U' R' `], // 9
    [` R U2' R' F R' F' R U' R U' R' `], // 10
    [` M U' R U2' R' U' R U' R2' r `], // 11
    [` F U R U' R' F' U' F U R U' R' F' `], // 12
    [` F' U' F r U' r' U r U r' `], // 13
    [` F U F' R' F R U' R' F' R `], // 14
    [` r' U' r U' R' U R r' U r `], // 15
    [` r U r' U R U' R' r U' r' `], // 16
    [` F R' F' R U2' F R' F' R U' R U' R' `], // 17
    [` r' U2' R U R' U r2' U2' R' U' R U' r' `], // 18
    [` F R' F' R M U R U' R' U' M' `], // 19
    [` r U R' U' M2' U R U' R' U' M' `], // 20
    [` R U R' U R U' R' U R U2' R' `], // 21
    [` R' U2' R2' U R2' U R2' U2' R' `], // 22
    [` R U2' R D R' U2' R D' R2' `], // 23
    [` F R' F' r U R U' r' `], // 24
    [` R' F' r U R U' r' F `], // 25
    [` R U R' U R U2' R' `], // 26
    [` R U2' R' U' R U' R' `], // 27
    [` R U R' U' M' U R U' r' `], // 28
    [` M F R' F' R U R U' R' U' M' `], // 29
    [` F U R U2' R' U R U2' R' U' F' `], // 30
    [` R' F R U R' U' F' U R `], // 31
    [` f R' F' R U R U' R' S' `], // 32
    [` F R' F' R U R U' R' `], // 33
    [` F U R' U' R' F' R U R2' U' R'  `], // 34
    [` R U2' R' F R' F' R2' U2' R' `], // 35
    [` F' L F L' U' L' U' L U L' U L `], // 36
    [` F R U' R' U R U R' F' `], // 37
    [` F R' F' R U R U R' U' R U' R' `], // 38
    [` L U F' U' L' U L F L'  `], // 39
    [` R' U' F U R U' R' F' R `], // 40
    [` F U R U' R' F' R U2' R' U' R U' R' `], // 41
    [` F U R U' R' F' R' U2' R U R' U R `], // 42
    [` f' U' L' U L f `], // 43
    [` f U R U' R' f' `], // 44
    [` F U R U' R' F' `], // 45
    [` R' U' F R' F' R U R `], // 46
    [` F' U' L' U L U' L' U L F `], // 47
    [` F U R U' R' U R U' R' F' `], // 48
    [` r' U r2' U' r2' U' r2' U r' `], // 49
    [` r U' r2' U r2' U r2' U' r `], // 50
    [` f U R U' R' U R U' R' f' `], // 51
    [` F R U R' d R' U' R U' R' `], // 52
    [` r' U2' R U R' U' R U R' U r `], // 53
    [` r U2' R' U' R U R' U' R U' r' `], // 54
    [` F R' F' U2' R U R' U R2' U2' R' `], // 55
    [` r U r' R U R' U' R U R' U' r U' r' `], // 56
    [` r U R' U' M U R U' R' `] // 57
];

let times = new Array(57).fill(null).map(() => []);


const timerDisplay = document.getElementById('timer');
const currentScramble = document.getElementById('scramble');

//helper functions

function updateTimer() {
    elapsedTime = Date.now() - startTime;
    formatTime = (elapsedTime/1000).toFixed(2);
    timerDisplay.textContent = formatTime;
}

function setRandomScramble() {
    currentOll = Math.floor(Math.random() * (57) + 1); //refer to c1 below

    //currentScramble.textContent = scrambles[currentOll - 1] + ' ' + currentOllPlusOne; //testing line

    currentScramble.textContent = scrambles[currentOll - 1];
    // c1. Since we want the OLL number to point to the exact item location (NOT index), we randomize currentOll from 1-57 
    // and subtract 1 from it when indexing to have it correlate accordingly with times (which has indicies 0-56, since 57 oll exist)

    // for example, we want the time correlating with OLL 1 to go in the first index of times, or times[0]
}


//start of program
if (document.body.id === 'oll-page') {
    setRandomScramble();
}

function setTimerColor(color){
    timerDisplay.classList.remove('timer-red', 'timer-green', 'timer-black');
    timerDisplay.classList.add(color);
}

document.addEventListener('keydown', function(event) {
    if (event.code === 'Space' && !event.repeat) {
        if (timerRunning) {
            timerRunning = false;
            times[currentOll-1].push(formatTime); //refer to c1 above

            //times[currentOll-1].push(formatTime + ' ' + currentOllPlusOne); //testing line

            setRandomScramble(); // do this after push statement so that the time is added to the correct index (setRandomScramble alters currentOLL)

            //console.log(JSON.stringify(times, null, 2)); //testing line

            clearInterval(timerInterval);
        } else {
            event.preventDefault();
            setTimerColor('timer-red');
            timerDisplay.textContent = (0.00).toFixed(2);
            timeoutID = setTimeout(() => {setTimerColor('timer-green');}, 500);
        }
    }
})


document.addEventListener('keyup', function(event) {
    if (event.code === 'Space') {
        event.preventDefault();
        if (timerDisplay.classList.contains('timer-green')) {
            setTimerColor('timer-black');
            timerRunning = true;
            startTime = Date.now(); 
            timerInterval = setInterval(updateTimer, 10);
        }
        if (timerDisplay.classList.contains('timer-red')) {
            clearTimeout(timeoutID);
            setTimerColor('timer-black');
            timerRunning = false;
            timerDisplay.textContent = formatTime;
        }
    }
})