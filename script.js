let timerRunning = false;
let startTime;
let timeoutID;
let elapsedTime = 0;
let timerInterval;

const timerDisplay = document.getElementById('timer');

function updateTimer() {
    elapsedTime = Date.now() - startTime;
    timerDisplay.textContent = (elapsedTime / 1000).toFixed(2);
}

function setTimerColor(color){
    timerDisplay.classList.remove('timer-red', 'timer-green', 'timer-black');
    timerDisplay.classList.add(color);
}

document.addEventListener('keydown', function(event) {
    if (event.code === 'Space' && !event.repeat) {
        if (timerRunning) {
            timerRunning = false;
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
            timerDisplay.textContent = (elapsedTime/1000).toFixed(2);
        }
    }
})