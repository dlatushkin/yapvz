window.PVZ = window.PVZ || {};

document.addEventListener('DOMContentLoaded', () => {
    const config = {
        type: Phaser.AUTO,
        width: PVZ.GAME_WIDTH,
        height: PVZ.GAME_HEIGHT,
        parent: 'game-container',
        backgroundColor: '#1a1a2e',
        scene: [
            PVZ.BootScene,
            PVZ.MenuScene,
            PVZ.LevelSelectScene,
            PVZ.GameScene,
            PVZ.HUDScene,
            PVZ.PauseScene,
            PVZ.WinScene,
            PVZ.LoseScene
        ],
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH
        }
    };

    const game = new Phaser.Game(config);
});
