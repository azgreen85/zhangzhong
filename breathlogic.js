// breathlogic.js

export function initBreathLogic(breathContainerId, retentionContainerId, onUpdate) {
    const breathContainer = document.getElementById(breathContainerId);
    const retentionContainer = document.getElementById(retentionContainerId);

    // 1. Define the Data for both groups separately
    const breathItems = [
        { id: 'inhale', label: 'Inhale', default: 3.0, color: '#4ade80' },
        { id: 'exhale', label: 'Exhale', default: 7.0, color: '#4ade80' }
    ];

    const retentionItems = [
        { id: 'holdTop', label: 'Hold (Full)', default: 0.0, color: '#fbbf24' },
        { id: 'holdBottom', label: 'Hold (Empty)', default: 0.0, color: '#fbbf24' }
    ];

    // 2. Helper function to build the HTML for a specific list of items
    function buildGroupHTML(title, items) {
        let html = `<h4 style="margin: 0 0 15px 0; color: #fff; text-transform: uppercase; font-size: 0.8rem; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 5px;">${title}</h4>`;
        
        items.forEach(p => {
            html += `
                <div class="phase-control-group" style="margin-bottom: 15px;">
                    <div class="phase-header" style="display: flex; justify-content: space-between; margin-bottom: 5px; font-size: 0.9rem;">
                        <label style="color:${p.color}">${p.label}</label>
                        <div class="input-wrapper" style="display: flex; align-items: center; gap: 5px;">
                            <input type="number" id="num-${p.id}" value="${p.default}" step="0.1" min="0" max="60" 
                                   style="width: 50px; background: rgba(0,0,0,0.3); border: 1px solid #333; color: white; border-radius: 4px; text-align: right;">
                            <span style="font-size: 0.8rem; opacity: 0.7;">s</span>
                        </div>
                    </div>
                    <input type="range" id="slider-${p.id}" value="${p.default}" step="0.1" min="0" max="60" style="width: 100%; cursor: pointer;">
                </div>
            `;
        });
        return html;
    }

    // 3. Inject HTML into the two separate containers
    if (breathContainer) {
        breathContainer.innerHTML = buildGroupHTML("Breath Cycle", breathItems);
    }
    if (retentionContainer) {
        retentionContainer.innerHTML = buildGroupHTML("Retention Control", retentionItems);
    }

    // 4. Logic to Sync Sliders and Inputs (Reads all 4, regardless of location)
    function broadcastValues() {
        const values = {
            inhale: parseFloat(document.getElementById('num-inhale')?.value) || 0,
            holdTop: parseFloat(document.getElementById('num-holdTop')?.value) || 0,
            exhale: parseFloat(document.getElementById('num-exhale')?.value) || 0,
            holdBottom: parseFloat(document.getElementById('num-holdBottom')?.value) || 0
        };
        onUpdate(values);
    }

    // 5. Add Event Listeners to everything (combine both lists)
    [...breathItems, ...retentionItems].forEach(p => {
        const slider = document.getElementById(`slider-${p.id}`);
        const num = document.getElementById(`num-${p.id}`);

        if (slider && num) {
            slider.addEventListener('input', (e) => {
                num.value = e.target.value;
                broadcastValues();
            });

            num.addEventListener('input', (e) => {
                slider.value = e.target.value;
                broadcastValues();
            });
        }
    });

    // 6. Initialize
    broadcastValues();
}