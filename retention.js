// retention.js

export function initRetention(containerId, onUpdate) {
    const container = document.getElementById(containerId);

    // 1. Inject UI (Hidden by default)
    container.innerHTML = `
        <button id="btn-toggle-retention" class="mode-btn">Enable Retention Mode</button>
        
        <div id="retention-controls" class="hidden-panel">
            <div class="control-group">
                <div class="label-row">
                    <span>Hold Top (Full Lungs)</span>
                    <span id="disp-hold-top" class="val-display">0.0s</span>
                </div>
                <input type="range" id="slider-hold-top" min="0" max="60" step="0.1" value="0">
            </div>

            <div class="control-group">
                <div class="label-row">
                    <span>Hold Bottom (Empty)</span>
                    <span id="disp-hold-bottom" class="val-display">0.0s</span>
                </div>
                <input type="range" id="slider-hold-bottom" min="0" max="60" step="0.1" value="0">
            </div>
        </div>
    `;

    // 2. Select Elements
    const toggleBtn = container.querySelector('#btn-toggle-retention');
    const panel = container.querySelector('#retention-controls');
    
    const sliderTop = container.querySelector('#slider-hold-top');
    const dispTop = container.querySelector('#disp-hold-top');
    
    const sliderBottom = container.querySelector('#slider-hold-bottom');
    const dispBottom = container.querySelector('#disp-hold-bottom');

    let isActive = false;

    // 3. Helper to get current values
    function getValues() {
        return {
            isActive: isActive,
            holdTop: parseFloat(sliderTop.value),
            holdBottom: parseFloat(sliderBottom.value)
        };
    }

    // 4. Event Listeners
    toggleBtn.addEventListener('click', () => {
        isActive = !isActive;
        if (isActive) {
            toggleBtn.innerText = "Disable Retention Mode";
            toggleBtn.classList.add('active-mode');
            panel.classList.remove('hidden-panel');
        } else {
            toggleBtn.innerText = "Enable Retention Mode";
            toggleBtn.classList.remove('active-mode');
            panel.classList.add('hidden-panel');
        }
        onUpdate(getValues());
    });

    sliderTop.addEventListener('input', () => {
        dispTop.innerText = parseFloat(sliderTop.value).toFixed(1) + "s";
        onUpdate(getValues());
    });

    sliderBottom.addEventListener('input', () => {
        dispBottom.innerText = parseFloat(sliderBottom.value).toFixed(1) + "s";
        onUpdate(getValues());
    });

    // Return current state immediately in case needed
    return getValues();
}