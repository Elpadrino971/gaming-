// Gestionnaire de l'interface utilisateur
export class UIManager {
    constructor(game) {
        this.game = game;
        this.elements = this.bindElements();
    }

    bindElements() {
        return {
            // Metrics
            wealthValue: document.getElementById('wealthValue'),
            wealthBar: document.getElementById('wealthBar'),
            incomeRate: document.getElementById('incomeRate'),
            environmentValue: document.getElementById('environmentValue'),
            environmentBar: document.getElementById('environmentBar'),
            moralityValue: document.getElementById('moralityValue'),
            moralityBar: document.getElementById('moralityBar'),
            influenceValue: document.getElementById('influenceValue'),
            influenceBar: document.getElementById('influenceBar'),
            stabilityValue: document.getElementById('stabilityValue'),
            stabilityBar: document.getElementById('stabilityBar'),

            // Profile
            playerProfile: document.getElementById('playerProfile'),

            // Content
            industryList: document.getElementById('industryList'),
            eventFeed: document.getElementById('eventFeed')
        };
    }

    update() {
        this.updateMetrics();
        this.updateProfile();
        this.updateIndustries();
    }

    updateMetrics() {
        const resources = this.game.resources;

        // Wealth
        const wealth = resources.get('wealth');
        const income = resources.getIncome();
        this.elements.wealthValue.textContent = resources.resources.wealth.format(wealth);
        this.elements.incomeRate.textContent = `+${resources.resources.wealth.format(income)}/s`;
        this.elements.wealthBar.style.width = `${Math.min(100, (wealth / 10000000) * 100)}%`;

        // Environment
        const environment = resources.get('environment');
        this.elements.environmentValue.textContent = `${Math.round(environment)}%`;
        this.elements.environmentBar.style.width = `${environment}%`;

        // Morality
        const morality = resources.get('morality');
        this.elements.moralityValue.textContent = `${Math.round(morality)}%`;
        this.elements.moralityBar.style.width = `${morality}%`;

        // Influence
        const influence = resources.get('influence');
        this.elements.influenceValue.textContent = `${Math.round(influence)}%`;
        this.elements.influenceBar.style.width = `${influence}%`;

        // Stability
        const stability = resources.get('stability');
        this.elements.stabilityValue.textContent = `${Math.round(stability)}%`;
        this.elements.stabilityBar.style.width = `${stability}%`;
    }

    updateProfile() {
        const profile = this.game.resources.getPlayerProfile();
        this.elements.playerProfile.textContent = profile;

        // Update class for styling
        this.elements.playerProfile.className = 'profile-type';
        if (profile.includes('Capitaliste')) {
            this.elements.playerProfile.classList.add('capitalist');
        } else if (profile.includes('Éco')) {
            this.elements.playerProfile.classList.add('eco');
        } else if (profile.includes('Mafieux')) {
            this.elements.playerProfile.classList.add('mafia');
        }
    }

    updateIndustries() {
        this.elements.industryList.innerHTML = '';

        for (const industry of Object.values(this.game.industries)) {
            if (!industry.unlocked) continue;

            const item = this.createIndustryElement(industry);
            this.elements.industryList.appendChild(item);
        }
    }

    createIndustryElement(industry) {
        const div = document.createElement('div');
        div.className = 'industry-item';

        const cost = this.game.getIndustryCost(industry);
        const canAfford = this.game.resources.canAfford(cost);

        div.innerHTML = `
            <div class="industry-info">
                <h4>${industry.icon} ${industry.name}</h4>
                <p>${industry.description}</p>
            </div>
            <div class="industry-stats">
                <div class="stat">
                    <div class="stat-label">Quantité</div>
                    <div class="stat-value">${industry.count}</div>
                </div>
                <div class="stat">
                    <div class="stat-label">Coût</div>
                    <div class="stat-value">${this.game.resources.resources.wealth.format(cost.wealth || 0)}</div>
                </div>
                <button class="btn btn-small" ${!canAfford ? 'disabled' : ''}>
                    Acheter
                </button>
            </div>
        `;

        const button = div.querySelector('button');
        button.addEventListener('click', () => {
            this.game.buyIndustry(industry.id);
            this.update();
        });

        return div;
    }

    addEvent(title, description, type = 'neutral', choices = null) {
        const eventDiv = document.createElement('div');
        eventDiv.className = `event-item ${type}`;

        let choicesHTML = '';
        if (choices && choices.length > 0) {
            choicesHTML = `
                <div class="event-actions">
                    ${choices.map((choice, index) => `
                        <button class="btn btn-small" data-choice-index="${index}">
                            ${choice.text}
                        </button>
                    `).join('')}
                </div>
            `;
        }

        eventDiv.innerHTML = `
            <div class="event-title">${title}</div>
            <div class="event-description">${description}</div>
            ${choicesHTML}
        `;

        // Add choice handlers
        if (choices) {
            const buttons = eventDiv.querySelectorAll('[data-choice-index]');
            buttons.forEach(button => {
                button.addEventListener('click', () => {
                    const index = parseInt(button.dataset.choiceIndex);
                    this.handleChoice(choices[index]);
                    eventDiv.remove();
                });
            });
        }

        this.elements.eventFeed.insertBefore(eventDiv, this.elements.eventFeed.firstChild);

        // Limit event feed to 10 items
        while (this.elements.eventFeed.children.length > 10) {
            this.elements.eventFeed.removeChild(this.elements.eventFeed.lastChild);
        }

        // Auto-scroll to top
        this.elements.eventFeed.scrollTop = 0;
    }

    handleChoice(choice) {
        const result = this.game.decisions.executeChoice(choice);
        if (result.success) {
            this.addEvent('✅ Décision prise', result.message, 'positive');
            this.update();
        } else {
            this.addEvent('❌ Impossible', result.message, 'negative');
        }
    }

    showDecision(event) {
        this.addEvent(event.title, event.description, event.type, event.choices);
    }

    showMessage(message, type = 'neutral') {
        this.addEvent('📢 Info', message, type);
    }

    showAchievement(achievement) {
        // Create achievement notification
        const notification = document.createElement('div');
        notification.className = 'achievement-notification';
        notification.innerHTML = `
            <div class="achievement-icon">🏆</div>
            <div class="achievement-content">
                <div class="achievement-title">${achievement.title}</div>
                <div class="achievement-desc">${achievement.description}</div>
            </div>
        `;

        // Add to body
        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => notification.classList.add('show'), 10);

        // Remove after 5 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 5000);

        // Also add to event feed
        let rewardText = '';
        if (achievement.reward) {
            const rewards = Object.entries(achievement.reward)
                .map(([resource, amount]) => `+${amount} ${resource}`)
                .join(', ');
            rewardText = ` Récompenses: ${rewards}`;
        }

        this.addEvent(
            `🏆 ${achievement.title}`,
            `${achievement.description}${rewardText}`,
            'positive'
        );
    }
}
