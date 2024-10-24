const startButton = document.getElementById('startButton');
const minutesInput = document.getElementById('minutesInput');
const timerDisplay = document.getElementById('timerDisplay');
const alarmSound = document.getElementById('alarmSound');
const circleLeft = document.querySelector('.circle-left .half-circle');
const circleRight = document.querySelector('.circle-right .half-circle');
let countdownInterval;

startButton.addEventListener('click', () => {
    const minutes = parseInt(minutesInput.value);
    if (isNaN(minutes) || minutes <= 0) {
        alert("Please enter a valid number of minutes.");
        return;
    }

    clearInterval(countdownInterval);
    startTimer(minutes * 60);
});

function startTimer(totalSeconds) {
    let remainingSeconds = totalSeconds;
    updateDisplay(remainingSeconds);
    updateAnimation(totalSeconds, remainingSeconds);

    countdownInterval = setInterval(() => {
        remainingSeconds--;
        updateDisplay(remainingSeconds);
        updateAnimation(totalSeconds, remainingSeconds);

        if (remainingSeconds <= 0) {
            clearInterval(countdownInterval);
            timerDisplay.classList.add('finished');
            alarmSound.play();
            document.body.style.background = "linear-gradient(135deg, #ff6f61, #ff5252)";
        }
    }, 1000);
}

function updateDisplay(remainingSeconds) {
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;
    timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function updateAnimation(totalSeconds, remainingSeconds) {
    const percentage = remainingSeconds / totalSeconds * 360;

    if (percentage > 180) {
        circleLeft.style.transform = `rotate(${percentage - 180}deg)`;
        circleRight.style.transform = 'rotate(180deg)';
    } else {
        circleRight.style.transform = `rotate(${percentage}deg)`;
        circleLeft.style.transform = 'rotate(0deg)';
    }

  
    const greenValue = Math.floor((remainingSeconds / totalSeconds) * 255);
    document.body.style.background = `linear-gradient(135deg, rgba(255,${greenValue},89), rgba(${greenValue},${greenValue},255))`;
}
