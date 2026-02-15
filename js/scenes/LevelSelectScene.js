window.PVZ = window.PVZ || {};

PVZ.LevelSelectScene = class LevelSelectScene extends Phaser.Scene {
    constructor() {
        super({ key: 'LevelSelectScene' });
    }

    create() {
        this.showingUpgrades = false;

        // Background
        const bg = this.add.graphics();
        bg.fillStyle(0x2d1a0e, 1);
        bg.fillRect(0, 0, PVZ.GAME_WIDTH, PVZ.GAME_HEIGHT);

        // Title
        this.add.text(PVZ.GAME_WIDTH / 2, 40, 'SELECT LEVEL', {
            fontSize: '36px',
            fontFamily: 'Arial',
            color: '#ffcc00',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        const completedLevels = PVZ.ScoreManager.getCompletedLevels();

        // Level buttons
        PVZ.LevelData.forEach((level, i) => {
            const x = 150 + i * 230;
            const y = 200;
            const isUnlocked = i === 0 || completedLevels.includes(i);
            const isCompleted = completedLevels.includes(level.id);

            // Card background
            const card = this.add.graphics();
            card.fillStyle(isUnlocked ? 0x5c3a1e : 0x333333, 1);
            card.fillRoundedRect(x - 80, y - 80, 160, 180, 10);
            card.lineStyle(3, isCompleted ? 0xffcc00 : 0x8b7355, 1);
            card.strokeRoundedRect(x - 80, y - 80, 160, 180, 10);

            // Level number
            this.add.text(x, y - 40, 'Level ' + level.id, {
                fontSize: '24px',
                fontFamily: 'Arial',
                color: isUnlocked ? '#ffffff' : '#666666',
                fontStyle: 'bold'
            }).setOrigin(0.5);

            // Level name
            this.add.text(x, y, level.name, {
                fontSize: '14px',
                fontFamily: 'Arial',
                color: isUnlocked ? '#cccccc' : '#555555',
                wordWrap: { width: 140 }
            }).setOrigin(0.5);

            // Waves info
            this.add.text(x, y + 30, level.waves.length + ' Waves', {
                fontSize: '12px',
                fontFamily: 'Arial',
                color: isUnlocked ? '#aaaaaa' : '#444444'
            }).setOrigin(0.5);

            // High score
            const highScore = PVZ.ScoreManager.prototype.getHighScore
                ? parseInt(localStorage.getItem('pvz_highscore_' + level.id) || '0')
                : 0;
            if (highScore > 0) {
                this.add.text(x, y + 50, 'Best: ' + highScore, {
                    fontSize: '12px',
                    fontFamily: 'Arial',
                    color: '#ffcc00'
                }).setOrigin(0.5);
            }

            // Completion star
            if (isCompleted) {
                this.add.text(x, y + 70, '★', {
                    fontSize: '24px',
                    color: '#ffcc00'
                }).setOrigin(0.5);
            }

            // Lock icon
            if (!isUnlocked) {
                this.add.text(x, y - 10, '🔒', {
                    fontSize: '32px'
                }).setOrigin(0.5);
            }

            // Interactive zone
            if (isUnlocked) {
                const hitZone = this.add.zone(x, y, 160, 180).setInteractive();
                hitZone.on('pointerover', () => card.setAlpha(0.8));
                hitZone.on('pointerout', () => card.setAlpha(1));
                hitZone.on('pointerdown', () => {
                    PVZ.SoundManager.play('button_click');
                    this.scene.start('GameScene', { levelId: level.id });
                });
            }
        });

        // Upgrade shop button
        const shopY = 440;
        const totalScore = PVZ.ScoreManager.getTotalScore();

        const shopBtn = this.add.image(PVZ.GAME_WIDTH / 2, shopY, 'ui_button').setInteractive();
        this.add.text(PVZ.GAME_WIDTH / 2, shopY, 'UPGRADES', {
            fontSize: '20px',
            fontFamily: 'Arial',
            color: '#ffffff',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        this.add.text(PVZ.GAME_WIDTH / 2, shopY + 35, 'Score: ' + totalScore, {
            fontSize: '14px',
            fontFamily: 'Arial',
            color: '#ffcc00'
        }).setOrigin(0.5);

        shopBtn.on('pointerdown', () => {
            PVZ.SoundManager.play('button_click');
            this.showUpgradeShop();
        });

        // Back button
        const backBtn = this.add.image(70, 560, 'ui_button_small').setInteractive();
        this.add.text(70, 560, 'BACK', {
            fontSize: '18px',
            fontFamily: 'Arial',
            color: '#ffffff',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        backBtn.on('pointerdown', () => {
            PVZ.SoundManager.play('button_click');
            this.scene.start('MenuScene');
        });
    }

    showUpgradeShop() {
        // Overlay
        const overlay = this.add.graphics();
        overlay.fillStyle(0x000000, 0.8);
        overlay.fillRect(0, 0, PVZ.GAME_WIDTH, PVZ.GAME_HEIGHT);
        overlay.setDepth(50);
        overlay.setInteractive(new Phaser.Geom.Rectangle(0, 0, PVZ.GAME_WIDTH, PVZ.GAME_HEIGHT), Phaser.Geom.Rectangle.Contains);

        const panel = this.add.container(0, 0).setDepth(51);

        // Title
        const title = this.add.text(PVZ.GAME_WIDTH / 2, 40, 'UPGRADE SHOP', {
            fontSize: '28px',
            fontFamily: 'Arial',
            color: '#ffcc00',
            fontStyle: 'bold'
        }).setOrigin(0.5);
        panel.add(title);

        const totalScore = PVZ.ScoreManager.getTotalScore();
        const scoreText = this.add.text(PVZ.GAME_WIDTH / 2, 70, 'Available Points: ' + totalScore, {
            fontSize: '16px',
            fontFamily: 'Arial',
            color: '#ffffff'
        }).setOrigin(0.5);
        panel.add(scoreText);

        const upgrades = PVZ.ScoreManager.getUpgrades();
        const plantTypes = Object.keys(PVZ.PlantData);

        plantTypes.forEach((type, i) => {
            const data = PVZ.PlantData[type];
            const x = 100 + (i % 3) * 250;
            const y = 130 + Math.floor(i / 3) * 180;
            const owned = !!upgrades[type];

            const card = this.add.graphics();
            card.fillStyle(owned ? 0x2d5a1e : 0x4a3520, 1);
            card.fillRoundedRect(x - 10, y - 10, 220, 150, 8);
            card.lineStyle(2, owned ? 0x44aa44 : 0x8b7355, 1);
            card.strokeRoundedRect(x - 10, y - 10, 220, 150, 8);
            panel.add(card);

            // Plant name
            const nameText = this.add.text(x + 100, y + 10, data.name, {
                fontSize: '18px',
                fontFamily: 'Arial',
                color: '#ffffff',
                fontStyle: 'bold'
            }).setOrigin(0.5);
            panel.add(nameText);

            // Upgrade name
            const upgradeName = this.add.text(x + 100, y + 35, data.upgrade.name, {
                fontSize: '14px',
                fontFamily: 'Arial',
                color: '#ffcc00'
            }).setOrigin(0.5);
            panel.add(upgradeName);

            // Description
            const desc = this.add.text(x + 100, y + 60, data.upgrade.description, {
                fontSize: '11px',
                fontFamily: 'Arial',
                color: '#cccccc',
                wordWrap: { width: 200 }
            }).setOrigin(0.5);
            panel.add(desc);

            if (owned) {
                const ownedText = this.add.text(x + 100, y + 110, 'OWNED', {
                    fontSize: '16px',
                    fontFamily: 'Arial',
                    color: '#44aa44',
                    fontStyle: 'bold'
                }).setOrigin(0.5);
                panel.add(ownedText);
            } else {
                const buyBtn = this.add.text(x + 100, y + 110, 'BUY (' + PVZ.UPGRADE_COST + ' pts)', {
                    fontSize: '14px',
                    fontFamily: 'Arial',
                    color: totalScore >= PVZ.UPGRADE_COST ? '#ffcc00' : '#666666',
                    fontStyle: 'bold',
                    backgroundColor: '#333333',
                    padding: { x: 10, y: 5 }
                }).setOrigin(0.5);

                if (totalScore >= PVZ.UPGRADE_COST) {
                    buyBtn.setInteractive();
                    buyBtn.on('pointerdown', () => {
                        const sm = new PVZ.ScoreManager(this);
                        if (sm.purchaseUpgrade(type)) {
                            PVZ.SoundManager.play('sun_collect');
                            // Refresh the scene
                            overlay.destroy();
                            panel.destroy();
                            this.scene.restart();
                        }
                    });
                }
                panel.add(buyBtn);
            }
        });

        // Close button
        const closeBtn = this.add.text(PVZ.GAME_WIDTH - 40, 20, 'X', {
            fontSize: '28px',
            fontFamily: 'Arial',
            color: '#ff4444',
            fontStyle: 'bold'
        }).setOrigin(0.5).setInteractive();
        closeBtn.on('pointerdown', () => {
            overlay.destroy();
            panel.destroy();
            closeBtn.destroy();
        });
        closeBtn.setDepth(52);
    }
};
