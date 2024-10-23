//Timer-related variables
let timerRunning = false;
let startTime;
let timeoutID;
let elapsedTime = 0;
let timerInterval;
let formatTime = (0.00).toFixed(2);

//OLL data
let ollScrambles;
let ollCaseNames;
let currentOll;

//PLL data
let pllScrambles;
let pllCaseNames;
let currentPll;

// Times array for OLL times
let ollTimes = new Array(57).fill(null).map(() => []);

// Times array for PLL times
let pllTimes = new Array(21).fill(null).map(() => []);

// DOM elements
const timerDisplay = document.getElementById('timer');
const currentScramble = document.getElementById('scramble');
const timerResults = document.getElementById('times-box');


//fetches OLL data from database
async function fetchSpreadsheetData() {
    if (document.body.id === 'oll-page') {
        const response = await fetch('https://docs.google.com/spreadsheets/d/1owibl9hlbkHKud2QcjV5LQEZvnQx3_oU9hC_ToF7lXY/export?format=csv');
        const data = await response.text();

        const rows = data.split('\n').slice(1, 58); 

        ollScrambles = rows.map(row => {
            const cols = row.split(',');
            const scramblesRead = cols[4].split(';').map(algorithm => algorithm.trim());
            return scramblesRead

        });

        ollCaseNames = rows.map(row => {
            const cols = row.split(',');
            const namesRead = cols[1]
            return namesRead

        });
    }
}


//helper functions

//starts timer and s
function updateTimer() {
    elapsedTime = Date.now() - startTime;
    formatTime = (elapsedTime/1000).toFixed(2);
    timerDisplay.textContent = formatTime;
}

function setRandomScramble() {
    if (document.body.id === 'oll-page') {
        currentOll = Math.floor(Math.random() * (57) + 1); //refer to c1 below
        let randomScr = Math.floor(Math.random() * (ollScrambles[currentOll - 1].length)); //finds a random scramble to set, in the index of the oll number

        //currentScramble.textContent = scrambles[currentOll - 1] + ' ' + currentOllPlusOne; //testing line

        currentScramble.textContent = ollScrambles[currentOll - 1][randomScr];
        // c1. Since we want the OLL number to point to the exact item location (NOT index), we randomize currentOll from 1-57 
        // and subtract 1 from it when indexing to have it correlate accordingly with times (which has indicies 0-56, since 57 oll exist)

        // for example, we want the time correlating with OLL 1 to go in the first index of times, or times[0]
    }
}

function updateTimerResults() {
    let format = "";
    if (document.body.id === 'oll-page') {
        for (let i = 0; i < ollTimes.length; i++) {
            if (ollTimes[i].length !== 0) {
                format += `<strong>${ollCaseNames[i]}</strong>: ${ollTimes[i]}<br>`; 
            }
        }
    }
    timerResults.innerHTML = format;
}


//start of program
if (document.body.id === 'oll-page' || document.body.id === 'pll-page') {
    
    fetchSpreadsheetData().then(() => {
        setRandomScramble();
        // console.log("OLL ALGS" , ollScrambles);
        // console.log("ALG NAMES", ollCaseNames);
        updateTimerResults();
    });
    
    
    
}

function setTimerColor(color){
    timerDisplay.classList.remove('timer-red', 'timer-green', 'timer-black');
    timerDisplay.classList.add(color);
}


document.addEventListener('keydown', function(event) {
    if (event.code === 'Space' && !event.repeat) {
        if (timerRunning) {
            timerRunning = false;
            if (document.body.id === 'oll-page') {
                ollTimes[currentOll-1].push(formatTime); //refer to c1 above
                setRandomScramble(); // do this after push statement so that the time is added to the correct index (setRandomScramble alters currentOLL)
                updateTimerResults();
                clearInterval(timerInterval);
            }
            if (document.body.id === 'pll-page') {
                //pllTimes[currentPll-1].push(formatTime);
                setRandomScramble();
                updateTimerResults();
                clearInterval(timerInterval);
            }
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