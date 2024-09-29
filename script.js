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
const laps = document.getElementById('laps');

// Function to format the time
let formatTime = (ms) => {
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
startBtn.addEventListener('click', () => {
    if (!running) {
        startTime = Date.now() - difference;
        interval = setInterval(updateDisplay, 10);
        running = true;
        startBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
        startBtn.style.display = "none";
        pauseBtn.style.display = "inline-block";
        resetBtn.style.display = "none";
        lapBtn.style.display = "inline-block";
        laps.style.display = "inline-block";
    }
});

// Pause the stopwatch
pauseBtn.addEventListener('click', () => {
    if (running) {
        clearInterval(interval);
        difference = Date.now() - startTime;
        running = false;
        startBtn.style.display = "inline-block";
        pauseBtn.style.display = "none";
        resetBtn.style.display = "inline-block";
        lapBtn.style.display = "none";
    }
});

// Reset the stopwatch
resetBtn.addEventListener('click',() => {
    clearInterval(interval);
    startTime = 0;
    difference = 0;
    running = false;
    display.textContent = '00:00:00';
    lapTimes.innerHTML = '';
    lapCounter = 1;
    startBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
    resetBtn.style.display = "none";
    laps.style.display = "none";
});

// Update the display
let updateDisplay = () => {
    updatedTime = Date.now() - startTime;
    display.textContent = formatTime(updatedTime);
}

// Record lap time
lapBtn.addEventListener('click',  () => {
    const lapTime = formatTime(updatedTime);
    const li = document.createElement('li');
    li.textContent = `Lap ${lapCounter}: ${lapTime}`;
    lapTimes.appendChild(li);
    lapCounter++;
});
