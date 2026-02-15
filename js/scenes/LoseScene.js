window.PVZ = window.PVZ || {};

PVZ.LoseScene = class LoseScene extends Phaser.Scene {
    constructor() {
        super({ key: 'LoseScene' });
    }

    init(data) {
        this.levelId = data.levelId || 1;
    }

    create() {
        PVZ.SoundManager.play('lose_sound');

        // Overlay
        const overlay = this.add.graphics();
        overlay.fillStyle(0x000000, 0.8);
        overlay.fillRect(0, 0, PVZ.GAME_WIDTH, PVZ.GAME_HEIGHT);

        // Title
        const title = this.add.text(PVZ.GAME_WIDTH / 2, 180, 'THE ZOMBIES ATE\nYOUR BRAINS!', {
            fontSize: '42px',
            fontFamily: 'Arial',
            color: '#ff4444',
            fontStyle: 'bold',
            stroke: '#000000',
            strokeThickness: 4,
            align: 'center'
        }).setOrigin(0.5);

        this.tweens.add({
            targets: title,
            alpha: 0.7,
            duration: 800,
            yoyo: true,
            repeat: -1
        });

        // Retry button
        const retryBtn = this.add.image(PVZ.GAME_WIDTH / 2, 350, 'ui_button').setInteractive();
        this.add.text(PVZ.GAME_WIDTH / 2, 350, 'RETRY', {
            fontSize: '24px',
            fontFamily: 'Arial',
            color: '#ffffff',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        retryBtn.on('pointerdown', () => {
            PVZ.SoundManager.play('button_click');
            this.scene.stop('GameScene');
            // this.scene.stop('HUDScene');
            this.scene.stop();
            this.scene.start('GameScene', { levelId: this.levelId });
        });

        // Menu button
        const menuBtn = this.add.image(PVZ.GAME_WIDTH / 2, 430, 'ui_button').setInteractive();
        this.add.text(PVZ.GAME_WIDTH / 2, 430, 'MENU', {
            fontSize: '24px',
            fontFamily: 'Arial',
            color: '#ffffff',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        menuBtn.on('pointerdown', () => {
            PVZ.SoundManager.play('button_click');
            this.scene.stop('GameScene');
            this.scene.stop('HUDScene');
            this.scene.stop();
            this.scene.start('LevelSelectScene');
        });
    }
};
