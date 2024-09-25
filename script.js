let startTime = 0;
let updatedTime = 0;
let difference = 0;
let interval;
let running = false;
let lapCounter = 1;

const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapTimes = document.getElementById('lapTimes');

// Function to format the time
function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = Math.floor((ms % 1000) / 10);
    
    return (
        (minutes < 10 ? '0' : '') + minutes + ':' +
        (seconds < 10 ? '0' : '') + seconds + ':' +
        (milliseconds < 10 ? '0' : '') + milliseconds
    );
}

// Start the stopwatch
function startStopwatch() {
    if (!running) {
        startTime = Date.now() - difference;
        interval = setInterval(updateDisplay, 10);
        running = true;
        startBtn.textContent = 'Resume';
        pauseBtn.disabled = false;
        lapBtn.disabled = false;
    }
}

// Pause the stopwatch
function pauseStopwatch() {
    if (running) {
        clearInterval(interval);
        difference = Date.now() - startTime;
        running = false;
    }
}

// Reset the stopwatch
function resetStopwatch() {
    clearInterval(interval);
    startTime = 0;
    difference = 0;
    running = false;
    display.textContent = '00:00:00';
    lapTimes.innerHTML = '';
    lapCounter = 1;
    startBtn.textContent = 'Start';
    pauseBtn.disabled = true;
    lapBtn.disabled = true;
}

// Update the display
function updateDisplay() {
    updatedTime = Date.now() - startTime;
    display.textContent = formatTime(updatedTime);
}

// Record lap time
function recordLap() {
    const lapTime = formatTime(updatedTime);
    const li = document.createElement('li');
    li.textContent = `Lap ${lapCounter}: ${lapTime}`;
    lapTimes.appendChild(li);
    lapCounter++;
}

// Event listeners
startBtn.addEventListener('click', startStopwatch);
pauseBtn.addEventListener('click', pauseStopwatch);
resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', recordLap);
