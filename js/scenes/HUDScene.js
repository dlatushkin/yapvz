window.PVZ = window.PVZ || {};

PVZ.HUDScene = class HUDScene extends Phaser.Scene {
    constructor() {
        super({ key: 'HUDScene' });
    }

    init(data) {
        this.levelData = data.levelData;
        this.levelId = data.levelId;
    }

    create() {
        // Plant bar
        this.plantBar = new PVZ.PlantBar(this, this.levelData.availablePlants);

        // Sun counter background
        const sunBg = this.add.graphics();
        sunBg.fillStyle(0x4a3520, 0.9);
        sunBg.fillRoundedRect(5, 5, 85, 60, 6);
        sunBg.lineStyle(2, 0x8b7355, 1);
        sunBg.strokeRoundedRect(5, 5, 85, 60, 6);
        sunBg.setDepth(99);

        // Sun icon
        const sunIcon = this.add.image(28, 25, 'sun').setScale(0.5);
        sunIcon.setDepth(100);

        // Sun text
        this.sunText = this.add.text(48, 25, '0', {
            fontSize: '18px',
            fontFamily: 'Arial',
            color: '#ffdd00',
            fontStyle: 'bold'
        }).setOrigin(0, 0.5);
        this.sunText.setDepth(100);

        // Score text
        this.scoreText = this.add.text(48, 48, 'Score: 0', {
            fontSize: '11px',
            fontFamily: 'Arial',
            color: '#cccccc'
        }).setOrigin(0, 0.5);
        this.scoreText.setDepth(100);

        // Wave text
        this.waveText = this.add.text(PVZ.GAME_WIDTH - 10, 15, '', {
            fontSize: '14px',
            fontFamily: 'Arial',
            color: '#ffffff',
            fontStyle: 'bold'
        }).setOrigin(1, 0);
        this.waveText.setDepth(100);

        // Level name
        this.add.text(PVZ.GAME_WIDTH - 10, 35, this.levelData.name, {
            fontSize: '11px',
            fontFamily: 'Arial',
            color: '#aaaaaa'
        }).setOrigin(1, 0).setDepth(100);

        // Pause button
        const pauseBtn = this.add.text(PVZ.GAME_WIDTH - 10, 55, '⏸ Pause', {
            fontSize: '14px',
            fontFamily: 'Arial',
            color: '#ffffff',
            backgroundColor: '#4a3520',
            padding: { x: 8, y: 4 }
        }).setOrigin(1, 0).setInteractive();
        pauseBtn.setDepth(100);

        pauseBtn.on('pointerdown', () => {
            PVZ.SoundManager.play('button_click');
            this.scene.pause('GameScene');
            this.scene.pause('HUDScene');
            this.scene.launch('PauseScene');
        });

        // Wave warning text (hidden initially)
        this.warningText = this.add.text(PVZ.GAME_WIDTH / 2, PVZ.GAME_HEIGHT / 2, '', {
            fontSize: '28px',
            fontFamily: 'Arial',
            color: '#ff4444',
            fontStyle: 'bold',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0.5).setAlpha(0).setDepth(200);

        // Event listeners
        this.game.events.on('sun-changed', (amount) => {
            this.sunText.setText(amount.toString());
        });

        this.game.events.on('score-changed', (score) => {
            this.scoreText.setText('Score: ' + score);
        });

        this.game.events.on('wave-start', (current, total) => {
            this.waveText.setText('Wave ' + current + '/' + total);
        });

        this.game.events.on('wave-warning', () => {
            this.showWarning('A HUGE WAVE IS APPROACHING!');
        });

        this.game.events.on('plant-placed', (type) => {
            this.plantBar.startCooldown(type);
            this.plantBar.selectedPlant = null;
        });
    }

    showWarning(text) {
        this.warningText.setText(text);
        this.warningText.setAlpha(1);

        this.tweens.add({
            targets: this.warningText,
            scaleX: 1.1,
            scaleY: 1.1,
            duration: 300,
            yoyo: true,
            repeat: 2,
            onComplete: () => {
                this.tweens.add({
                    targets: this.warningText,
                    alpha: 0,
                    duration: 500
                });
            }
        });
    }

    update(time, delta) {
        if (this.plantBar) {
            this.plantBar.update(time, delta);
        }
    }

    shutdown() {
        this.game.events.off('sun-changed');
        this.game.events.off('score-changed');
        this.game.events.off('wave-start');
        this.game.events.off('wave-warning');
        this.game.events.off('plant-placed');
    }
};
