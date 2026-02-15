window.PVZ = window.PVZ || {};

PVZ.ScoreManager = class ScoreManager {
    constructor(scene) {
        this.scene = scene;
        this.score = 0;
        this.totalScore = this.loadTotalScore();
        this.upgrades = this.loadUpgrades();
    }

    addScore(amount) {
        this.score += amount;
        this.scene.game.events.emit('score-changed', this.score);
    }

    getScore() {
        return this.score;
    }

    saveLevelScore(levelId) {
        const key = 'pvz_highscore_' + levelId;
        const existing = parseInt(localStorage.getItem(key) || '0');
        if (this.score > existing) {
            localStorage.setItem(key, this.score.toString());
        }

        // Add to total score pool
        this.totalScore += this.score;
        localStorage.setItem('pvz_total_score', this.totalScore.toString());

        // Mark level as completed
        const completed = JSON.parse(localStorage.getItem('pvz_completed_levels') || '[]');
        if (!completed.includes(levelId)) {
            completed.push(levelId);
            localStorage.setItem('pvz_completed_levels', JSON.stringify(completed));
        }
    }

    loadTotalScore() {
        return parseInt(localStorage.getItem('pvz_total_score') || '0');
    }

    loadUpgrades() {
        return JSON.parse(localStorage.getItem('pvz_upgrades') || '{}');
    }

    hasUpgrade(plantType) {
        return !!this.upgrades[plantType];
    }

    purchaseUpgrade(plantType) {
        if (this.totalScore >= PVZ.UPGRADE_COST && !this.upgrades[plantType]) {
            this.totalScore -= PVZ.UPGRADE_COST;
            this.upgrades[plantType] = true;
            localStorage.setItem('pvz_total_score', this.totalScore.toString());
            localStorage.setItem('pvz_upgrades', JSON.stringify(this.upgrades));
            return true;
        }
        return false;
    }

    getCompletedLevels() {
        return JSON.parse(localStorage.getItem('pvz_completed_levels') || '[]');
    }

    getHighScore(levelId) {
        return parseInt(localStorage.getItem('pvz_highscore_' + levelId) || '0');
    }

    static getTotalScore() {
        return parseInt(localStorage.getItem('pvz_total_score') || '0');
    }

    static getUpgrades() {
        return JSON.parse(localStorage.getItem('pvz_upgrades') || '{}');
    }

    static getCompletedLevels() {
        return JSON.parse(localStorage.getItem('pvz_completed_levels') || '[]');
    }
};
