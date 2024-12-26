let timer;
let running = false;
let milliseconds = 0;
let seconds = 0;
let minutes = 0;
let hours = 0;
let lapTimes = [];

function formatTime() {
    let formattedMilliseconds = milliseconds < 10 ? '00' + milliseconds : milliseconds < 100 ? '0' + milliseconds : milliseconds;
    let formattedSeconds = seconds < 10 ? '0' + seconds : seconds;
    let formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    let formattedHours = hours < 10 ? '0' + hours : hours;
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}.${formattedMilliseconds}`;
}

function startStop() {
    if (running) {
        clearInterval(timer);
        document.getElementById("startStop").innerText = "Start";
    } else {
        timer = setInterval(updateTime, 10); // Update every 10ms for finer granularity
        document.getElementById("startStop").innerText = "Pause";
    }
    running = !running;
}

function updateTime() {
    milliseconds++;
    if (milliseconds >= 100) {
        milliseconds = 0;
        seconds++;
    }
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
    }
    if (minutes >= 60) {
        minutes = 0;
        hours++;
    }
    document.getElementById("time").innerText = formatTime();
}

function reset() {
    clearInterval(timer);
    running = false;
    milliseconds = 0;
    seconds = 0;
    minutes = 0;
    hours = 0;
    lapTimes = [];
    document.getElementById("time").innerText = formatTime();
    document.getElementById("laps").innerHTML = "";
    document.getElementById("lapNote").value = ""; // Clear the lap note input
    document.getElementById("startStop").innerText = "Start";
}

function recordLap() {
    if (running) {
        let lapTime = formatTime();
        let lapNote = document.getElementById("lapNote").value || "No note"; // Default note if empty
        lapTimes.push({ time: lapTime, note: lapNote });
        
        // Create a lap element with time and note
        let lapElement = document.createElement("div");
        lapElement.classList.add("lap");
        lapElement.innerHTML = `Lap <span>${lapTimes.length}</span>: ${lapTime} - <em>${lapNote}</em>`;
        document.getElementById("laps").appendChild(lapElement);
        
        // Clear the note input after recording the lap
        document.getElementById("lapNote").value = "";
    }
}
