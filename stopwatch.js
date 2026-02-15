// stopwatch.js

export function initStopwatch(containerId, onStateChange, onReset) {
    const container = document.getElementById(containerId);

    container.innerHTML = `
        <div class="time-display" id="sw-display">00:00</div>
        <div class="button-row">
            <button id="sw-btn-toggle">Start</button>
            <button id="sw-btn-reset">Reset</button>
        </div>
    `;

    const display = container.querySelector('#sw-display');
    const toggleBtn = container.querySelector('#sw-btn-toggle');
    const resetBtn = container.querySelector('#sw-btn-reset');

    let interval = null;
    let seconds = 0;
    let isRunning = false;

    function formatTime(totalSeconds) {
        const m = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
        const s = (totalSeconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    }

    toggleBtn.addEventListener('click', () => {
        if (isRunning) {
            // PAUSE
            clearInterval(interval);
            isRunning = false;
            toggleBtn.innerText = "Start";
            toggleBtn.classList.remove('active');
            if (onStateChange) onStateChange(false); 
        } else {
            // START
            isRunning = true;
            toggleBtn.innerText = "Pause";
            toggleBtn.classList.add('active');
            if (onStateChange) onStateChange(true); 

            interval = setInterval(() => {
                seconds++;
                display.innerText = formatTime(seconds);
            }, 1000);
        }
    });

    resetBtn.addEventListener('click', () => {
        // 1. Stop the internal logic
        clearInterval(interval);
        isRunning = false;
        seconds = 0;
        display.innerText = "00:00";
        toggleBtn.innerText = "Start";
        toggleBtn.classList.remove('active');
        
        // 2. Tell the main app to STOP (Pause)
        if (onStateChange) onStateChange(false); 

        // 3. Tell the main app to REWIND (Reset Animation)
        if (onReset) onReset();
    });
}