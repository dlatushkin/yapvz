window.PVZ = window.PVZ || {};

PVZ.WinScene = class WinScene extends Phaser.Scene {
    constructor() {
        super({ key: 'WinScene' });
    }

    init(data) {
        this.finalScore = data.score || 0;
        this.levelId = data.levelId || 1;
    }

    create() {
        PVZ.SoundManager.play('win_jingle');

        // Overlay
        const overlay = this.add.graphics();
        overlay.fillStyle(0x000000, 0.7);
        overlay.fillRect(0, 0, PVZ.GAME_WIDTH, PVZ.GAME_HEIGHT);

        // Win title
        const title = this.add.text(PVZ.GAME_WIDTH / 2, 140, 'LEVEL COMPLETE!', {
            fontSize: '48px',
            fontFamily: 'Arial',
            color: '#ffcc00',
            fontStyle: 'bold',
            stroke: '#4a2800',
            strokeThickness: 4
        }).setOrigin(0.5);

        this.tweens.add({
            targets: title,
            scaleX: 1.05,
            scaleY: 1.05,
            duration: 500,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        // Score
        this.add.text(PVZ.GAME_WIDTH / 2, 230, 'Score: ' + this.finalScore, {
            fontSize: '32px',
            fontFamily: 'Arial',
            color: '#ffffff',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // Level bonus
        this.add.text(PVZ.GAME_WIDTH / 2, 270, '+ ' + PVZ.SCORE_LEVEL_COMPLETE + ' Level Bonus', {
            fontSize: '18px',
            fontFamily: 'Arial',
            color: '#88ff88'
        }).setOrigin(0.5);

        // Sun decorations
        for (let i = 0; i < 8; i++) {
            const sun = this.add.image(
                Phaser.Math.Between(100, PVZ.GAME_WIDTH - 100),
                Phaser.Math.Between(50, PVZ.GAME_HEIGHT - 50),
                'sun'
            ).setAlpha(0.5).setScale(0.5 + Math.random() * 0.5);

            this.tweens.add({
                targets: sun,
                y: '-=30',
                alpha: 0,
                duration: 2000 + Math.random() * 1000,
                repeat: -1,
                delay: Math.random() * 1000
            });
        }

        // Next level button
        const nextLevelId = this.levelId + 1;
        if (nextLevelId <= PVZ.LevelData.length) {
            const nextBtn = this.add.image(PVZ.GAME_WIDTH / 2, 370, 'ui_button').setInteractive();
            this.add.text(PVZ.GAME_WIDTH / 2, 370, 'NEXT LEVEL', {
                fontSize: '22px',
                fontFamily: 'Arial',
                color: '#ffffff',
                fontStyle: 'bold'
            }).setOrigin(0.5);

            nextBtn.on('pointerdown', () => {
                PVZ.SoundManager.play('button_click');
                this.scene.stop('GameScene');
                this.scene.stop('HUDScene');
                this.scene.stop();
                this.scene.start('GameScene', { levelId: nextLevelId });
            });
        }

        // Menu button
        const menuBtn = this.add.image(PVZ.GAME_WIDTH / 2, 440, 'ui_button').setInteractive();
        this.add.text(PVZ.GAME_WIDTH / 2, 440, 'MENU', {
            fontSize: '22px',
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
