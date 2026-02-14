// breathlogic.js

export function initBreathLogic(containerId, onUpdate) {
    const container = document.getElementById(containerId);

    // 1. Define the Groups and their Phases
    const groups = [
        {
            title: "Breath",
            items: [
                { id: 'inhale', label: 'Inhale', default: 3.0, color: '#4ade80' },
                { id: 'exhale', label: 'Exhale', default: 7.0, color: '#4ade80' }
            ]
        },
        {
            title: "Retention",
            items: [
                { id: 'holdTop', label: 'Hold (Full)', default: 0.0, color: '#fbbf24' },
                { id: 'holdBottom', label: 'Hold (Empty)', default: 0.0, color: '#fbbf24' }
            ]
        }
    ];

    // 2. Build the HTML UI
    let html = `<div class="breath-logic-panel">`;

    groups.forEach(group => {
        // Add Group Header
        html += `<h4 style="margin: 15px 0 10px 0; color: #fff; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 5px;">${group.title}</h4>`;
        
        // Add Sliders for this group
        group.items.forEach(p => {
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
    });

    html += `</div>`;
    container.innerHTML = html;

    // 3. Logic to Sync Sliders and Inputs (unchanged)
    function broadcastValues() {
        // We safely grab values, defaulting to 0 if something is missing
        const values = {
            inhale: parseFloat(document.getElementById('num-inhale').value) || 0,
            holdTop: parseFloat(document.getElementById('num-holdTop').value) || 0,
            exhale: parseFloat(document.getElementById('num-exhale').value) || 0,
            holdBottom: parseFloat(document.getElementById('num-holdBottom').value) || 0
        };
        onUpdate(values);
    }

    // 4. Add Event Listeners
    groups.forEach(group => {
        group.items.forEach(p => {
            const slider = document.getElementById(`slider-${p.id}`);
            const num = document.getElementById(`num-${p.id}`);

            slider.addEventListener('input', (e) => {
                num.value = e.target.value;
                broadcastValues();
            });

            num.addEventListener('input', (e) => {
                slider.value = e.target.value;
                broadcastValues();
            });
        });
    });

    // 5. Initialize
    broadcastValues();
}