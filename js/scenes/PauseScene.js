window.PVZ = window.PVZ || {};

PVZ.PauseScene = class PauseScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PauseScene' });
    }

    create() {
        // Dim overlay
        const overlay = this.add.graphics();
        overlay.fillStyle(0x000000, 0.6);
        overlay.fillRect(0, 0, PVZ.GAME_WIDTH, PVZ.GAME_HEIGHT);

        // Pause title
        this.add.text(PVZ.GAME_WIDTH / 2, 200, 'PAUSED', {
            fontSize: '48px',
            fontFamily: 'Arial',
            color: '#ffffff',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // Resume button
        const resumeBtn = this.add.image(PVZ.GAME_WIDTH / 2, 310, 'ui_button').setInteractive();
        this.add.text(PVZ.GAME_WIDTH / 2, 310, 'RESUME', {
            fontSize: '24px',
            fontFamily: 'Arial',
            color: '#ffffff',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        resumeBtn.on('pointerdown', () => {
            PVZ.SoundManager.play('button_click');
            this.scene.resume('GameScene');
            this.scene.resume('HUDScene');
            this.scene.stop();
        });

        // Quit button
        const quitBtn = this.add.image(PVZ.GAME_WIDTH / 2, 390, 'ui_button').setInteractive();
        this.add.text(PVZ.GAME_WIDTH / 2, 390, 'QUIT', {
            fontSize: '24px',
            fontFamily: 'Arial',
            color: '#ffffff',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        quitBtn.on('pointerdown', () => {
            PVZ.SoundManager.play('button_click');
            this.scene.stop('GameScene');
            this.scene.stop('HUDScene');
            this.scene.stop();
            this.scene.start('LevelSelectScene');
        });
    }
};
