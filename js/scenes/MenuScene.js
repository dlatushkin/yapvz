window.PVZ = window.PVZ || {};

PVZ.MenuScene = class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }

    create() {
        // Background
        const bg = this.add.graphics();
        bg.fillStyle(PVZ.COLORS.SKY, 1);
        bg.fillRect(0, 0, PVZ.GAME_WIDTH, PVZ.GAME_HEIGHT);

        // Lawn at bottom
        bg.fillStyle(PVZ.COLORS.LAWN_LIGHT, 1);
        bg.fillRect(0, 400, PVZ.GAME_WIDTH, 200);
        bg.fillStyle(PVZ.COLORS.LAWN_DARK, 1);
        for (let i = 0; i < 12; i++) {
            if (i % 2 === 0) {
                bg.fillRect(i * 80, 400, 80, 200);
            }
        }

        // Title
        const title = this.add.text(PVZ.GAME_WIDTH / 2, 120, 'PLANTS vs ZOMBIES', {
            fontSize: '52px',
            fontFamily: 'Arial Black, Arial',
            color: '#4a2800',
            fontStyle: 'bold',
            stroke: '#ffcc00',
            strokeThickness: 4
        }).setOrigin(0.5);

        // Subtitle
        this.add.text(PVZ.GAME_WIDTH / 2, 175, 'The Clone by San\'ok', {
            fontSize: '24px',
            fontFamily: 'Arial',
            color: '#2d5a1e',
            fontStyle: 'italic'
        }).setOrigin(0.5);

        // // Animated sun decorations
        // for (let i = 0; i < 5; i++) {
        //     const sun = this.add.image(
        //         Phaser.Math.Between(50, PVZ.GAME_WIDTH - 50),
        //         Phaser.Math.Between(200, 380),
        //         'sun'
        //     ).setScale(0.8 + Math.random() * 0.5);

        //     this.tweens.add({
        //         targets: sun,
        //         y: sun.y + Phaser.Math.Between(-20, 20),
        //         x: sun.x + Phaser.Math.Between(-15, 15),
        //         angle: 360,
        //         duration: 3000 + Math.random() * 2000,
        //         yoyo: true,
        //         repeat: -1,
        //         ease: 'Sine.easeInOut'
        //     });
        // }

        // Play button
        const playBtn = this.add.image(PVZ.GAME_WIDTH / 2 - 120, 300, 'ui_button').setInteractive();
        const playText = this.add.text(PVZ.GAME_WIDTH / 2 - 120, 300, 'PLAY', {
            fontSize: '28px',
            fontFamily: 'Arial',
            color: '#ffffff',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        playBtn.on('pointerover', () => {
            playBtn.setScale(1.05);
            playText.setScale(1.05);
        });
        playBtn.on('pointerout', () => {
            playBtn.setScale(1);
            playText.setScale(1);
        });
        playBtn.on('pointerdown', () => {
            PVZ.SoundManager.play('button_click');
            this.scene.start('LevelSelectScene');
        });

        // Exit button
        const exitBtn = this.add.image(PVZ.GAME_WIDTH / 2 + 120, 300, 'ui_button').setInteractive();
        const exitText = this.add.text(PVZ.GAME_WIDTH / 2 + 120, 300, 'EXIT', {
            fontSize: '28px',
            fontFamily: 'Arial',
            color: '#ffffff',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        exitBtn.on('pointerover', () => {
            exitBtn.setScale(1.05);
            exitText.setScale(1.05);
        });
        exitBtn.on('pointerout', () => {
            exitBtn.setScale(1);
            exitText.setScale(1);
        });
        exitBtn.on('pointerdown', () => {
            PVZ.SoundManager.play('button_click');
            this.scene.start('LevelSelectScene');
        });

        // Version / credits
        this.add.text(PVZ.GAME_WIDTH / 2, 560, 'Made with Phaser.js', {
            fontSize: '14px',
            fontFamily: 'Arial',
            color: '#666666'
        }).setOrigin(0.5);

        // Title animation
        this.tweens.add({
            targets: title,
            y: 125,
            duration: 1500,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
    }
};
