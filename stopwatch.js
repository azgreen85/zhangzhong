// stopwatch.js

export function initStopwatch(containerId) {
    const container = document.getElementById(containerId);

    // 1. Inject the HTML into the container
    container.innerHTML = `
        <div class="time-display" id="sw-display">00:00</div>
        <div class="button-row">
            <button id="sw-btn-toggle">Start</button>
            <button id="sw-btn-reset">Reset</button>
        </div>
    `;

    // 2. Select the new elements
    const display = container.querySelector('#sw-display');
    const toggleBtn = container.querySelector('#sw-btn-toggle');
    const resetBtn = container.querySelector('#sw-btn-reset');

    // 3. Variables for logic
    let interval = null;
    let seconds = 0;
    let isRunning = false;

    // 4. Helper function to format time (MM:SS)
    function formatTime(totalSeconds) {
        const m = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
        const s = (totalSeconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    }

    // 5. Toggle Start/Stop
    toggleBtn.addEventListener('click', () => {
        if (isRunning) {
            // Pause
            clearInterval(interval);
            isRunning = false;
            toggleBtn.innerText = "Start";
            toggleBtn.classList.remove('active');
        } else {
            // Start
            isRunning = true;
            toggleBtn.innerText = "Pause";
            toggleBtn.classList.add('active');
            
            interval = setInterval(() => {
                seconds++;
                display.innerText = formatTime(seconds);
            }, 1000);
        }
    });

    // 6. Reset
    resetBtn.addEventListener('click', () => {
        clearInterval(interval);
        isRunning = false;
        seconds = 0;
        display.innerText = "00:00";
        toggleBtn.innerText = "Start";
        toggleBtn.classList.remove('active');
    });
}