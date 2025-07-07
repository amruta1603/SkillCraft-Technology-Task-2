let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let laps = [];

function formatTime(ms) {
  const date = new Date(ms);
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');
  const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0');
  return `${minutes}:${seconds}.${milliseconds}`;
}

function updateDisplay() {
  document.getElementById('display').textContent = formatTime(elapsedTime);
}

function startStopwatch() {
  if (!timerInterval) {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      updateDisplay();
    }, 10);
  }
}

function pauseStopwatch() {
  clearInterval(timerInterval);
  timerInterval = null;
}

function resetStopwatch() {
  clearInterval(timerInterval);
  timerInterval = null;
  elapsedTime = 0;
  laps = [];
  updateDisplay();
  document.getElementById('lapList').innerHTML = '';
}

function recordLap() {
  if (elapsedTime === 0) return;
  const lapTime = formatTime(elapsedTime);
  laps.push(lapTime);
  const lapItem = document.createElement('li');
  lapItem.textContent = `Lap ${laps.length}: ${lapTime}`;
  document.getElementById('lapList').appendChild(lapItem);
}
