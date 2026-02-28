window.PVZ = window.PVZ || {};

PVZ.BootScene = class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' });
    }

    create() {
        this.generateTextures();
        PVZ.SoundManager.init();
        this.scene.start('MenuScene');
    }

    preload() {
        // Load any assets needed for the menu or preloader here
        this.load.image('plant_sunflower', 'assets/sunflower.bmp');
    }

    generateTextures() {
        const gfx = this.add.graphics();

        // --- Peashooter ---
        gfx.clear();
        gfx.fillStyle(PVZ.COLORS.PEASHOOTER_DARK, 1);
        gfx.fillRect(18, 40, 12, 20); // stem
        gfx.fillStyle(PVZ.COLORS.PEASHOOTER_GREEN, 1);
        gfx.fillCircle(24, 24, 20); // head
        gfx.fillStyle(0xffffff, 1);
        gfx.fillCircle(30, 20, 6); // eye white
        gfx.fillStyle(0x000000, 1);
        gfx.fillCircle(32, 20, 3); // pupil
        gfx.fillStyle(PVZ.COLORS.PEASHOOTER_DARK, 1);
        gfx.fillRect(34, 22, 14, 8); // mouth/barrel
        gfx.generateTexture('plant_peashooter', 48, 60);

        // // --- Sunflower ---
        // gfx.clear();
        // // Petals
        // for (let i = 0; i < 8; i++) {
        //     const angle = (i / 8) * Math.PI * 2;
        //     const px = 24 + Math.cos(angle) * 16;
        //     const py = 24 + Math.sin(angle) * 16;
        //     gfx.fillStyle(PVZ.COLORS.SUNFLOWER_PETAL, 1);
        //     gfx.fillCircle(px, py, 8);
        // }
        // gfx.fillStyle(PVZ.COLORS.SUNFLOWER_CENTER, 1);
        // gfx.fillCircle(24, 24, 12); // center
        // gfx.fillStyle(PVZ.COLORS.SUNFLOWER_YELLOW, 1);
        // gfx.fillCircle(24, 22, 10);
        // gfx.fillStyle(0x000000, 1);
        // gfx.fillCircle(21, 21, 2); // eyes
        // gfx.fillCircle(27, 21, 2);
        // // Stem
        // gfx.fillStyle(0x2d5a1e, 1);
        // gfx.fillRect(21, 38, 6, 22);
        // gfx.generateTexture('plant_sunflower', 48, 60);

        // --- Wall-nut ---
        gfx.clear();
        gfx.fillStyle(PVZ.COLORS.WALLNUT_BROWN, 1);
        gfx.fillRoundedRect(4, 4, 40, 52, 12);
        gfx.fillStyle(PVZ.COLORS.WALLNUT_DARK, 1);
        gfx.fillRoundedRect(8, 8, 32, 44, 10);
        gfx.fillStyle(PVZ.COLORS.WALLNUT_BROWN, 1);
        gfx.fillRoundedRect(10, 10, 28, 40, 8);
        // Face
        gfx.fillStyle(0x000000, 1);
        gfx.fillCircle(18, 24, 3);
        gfx.fillCircle(30, 24, 3);
        // Mouth
        gfx.lineStyle(2, 0x000000, 1);
        gfx.beginPath();
        gfx.arc(24, 34, 6, 0, Math.PI, false);
        gfx.strokePath();
        gfx.generateTexture('plant_wallnut', 48, 60);

        // --- Snow Pea ---
        gfx.clear();
        gfx.fillStyle(PVZ.COLORS.SNOWPEA_DARK, 1);
        gfx.fillRect(18, 40, 12, 20);
        gfx.fillStyle(PVZ.COLORS.SNOWPEA_BLUE, 1);
        gfx.fillCircle(24, 24, 20);
        gfx.fillStyle(0xffffff, 1);
        gfx.fillCircle(30, 20, 6);
        gfx.fillStyle(0x0044aa, 1);
        gfx.fillCircle(32, 20, 3);
        gfx.fillStyle(PVZ.COLORS.SNOWPEA_DARK, 1);
        gfx.fillRect(34, 22, 14, 8);
        // Ice crystals
        gfx.fillStyle(0xaaddff, 0.7);
        gfx.fillTriangle(10, 10, 14, 4, 18, 10);
        gfx.fillTriangle(6, 20, 10, 14, 14, 20);
        gfx.generateTexture('plant_snowpea', 48, 60);

        // --- Cherry Bomb ---
        gfx.clear();
        // Stems
        gfx.fillStyle(PVZ.COLORS.CHERRY_STEM, 1);
        gfx.fillRect(18, 0, 4, 18);
        gfx.fillRect(28, 0, 4, 18);
        // Cherries
        gfx.fillStyle(PVZ.COLORS.CHERRY_RED, 1);
        gfx.fillCircle(16, 30, 14);
        gfx.fillCircle(34, 30, 14);
        gfx.fillStyle(PVZ.COLORS.CHERRY_DARK, 1);
        gfx.fillCircle(14, 28, 12);
        gfx.fillCircle(32, 28, 12);
        gfx.fillStyle(PVZ.COLORS.CHERRY_RED, 1);
        gfx.fillCircle(16, 30, 11);
        gfx.fillCircle(34, 30, 11);
        // Angry eyes
        gfx.fillStyle(0x000000, 1);
        gfx.fillCircle(13, 28, 2);
        gfx.fillCircle(19, 28, 2);
        gfx.fillCircle(31, 28, 2);
        gfx.fillCircle(37, 28, 2);
        // Fuse
        gfx.lineStyle(2, 0xffaa00, 1);
        gfx.beginPath();
        gfx.moveTo(24, 2);
        gfx.lineTo(24, -4);
        gfx.strokePath();
        gfx.fillStyle(0xff6600, 1);
        gfx.fillCircle(24, -4, 3);
        gfx.generateTexture('plant_cherrybomb', 50, 50);

        // --- Repeater ---
        gfx.clear();
        gfx.fillStyle(PVZ.COLORS.REPEATER_DARK, 1);
        gfx.fillRect(18, 40, 12, 20);
        gfx.fillStyle(PVZ.COLORS.REPEATER_GREEN, 1);
        gfx.fillCircle(24, 26, 18);
        gfx.fillCircle(24, 16, 14);
        gfx.fillStyle(0xffffff, 1);
        gfx.fillCircle(30, 14, 5);
        gfx.fillStyle(0x000000, 1);
        gfx.fillCircle(31, 14, 2.5);
        gfx.fillStyle(PVZ.COLORS.REPEATER_DARK, 1);
        gfx.fillRect(34, 14, 14, 7);
        gfx.fillRect(34, 24, 14, 7);
        gfx.generateTexture('plant_repeater', 48, 60);

        // --- Regular Zombie ---
        gfx.clear();
        // Body
        gfx.fillStyle(PVZ.COLORS.ZOMBIE_SHIRT, 1);
        gfx.fillRect(12, 24, 24, 20);
        // Pants
        gfx.fillStyle(PVZ.COLORS.ZOMBIE_PANTS, 1);
        gfx.fillRect(12, 44, 10, 16);
        gfx.fillRect(26, 44, 10, 16);
        // Arms
        gfx.fillStyle(PVZ.COLORS.ZOMBIE_SKIN, 1);
        gfx.fillRect(0, 26, 12, 6);
        gfx.fillRect(36, 26, 12, 6);
        // Head
        gfx.fillStyle(PVZ.COLORS.ZOMBIE_SKIN, 1);
        gfx.fillCircle(24, 14, 14);
        // Eyes
        gfx.fillStyle(0xffff00, 1);
        gfx.fillCircle(19, 12, 4);
        gfx.fillCircle(29, 12, 4);
        gfx.fillStyle(0x000000, 1);
        gfx.fillCircle(20, 12, 2);
        gfx.fillCircle(30, 12, 2);
        gfx.generateTexture('zombie_regular', 48, 60);

        // --- Conehead ---
        gfx.clear();
        // Body (same as regular)
        gfx.fillStyle(PVZ.COLORS.ZOMBIE_SHIRT, 1);
        gfx.fillRect(12, 30, 24, 20);
        gfx.fillStyle(PVZ.COLORS.ZOMBIE_PANTS, 1);
        gfx.fillRect(12, 50, 10, 14);
        gfx.fillRect(26, 50, 10, 14);
        gfx.fillStyle(PVZ.COLORS.ZOMBIE_SKIN, 1);
        gfx.fillRect(0, 32, 12, 6);
        gfx.fillRect(36, 32, 12, 6);
        gfx.fillStyle(PVZ.COLORS.ZOMBIE_SKIN, 1);
        gfx.fillCircle(24, 22, 14);
        gfx.fillStyle(0xffff00, 1);
        gfx.fillCircle(19, 20, 4);
        gfx.fillCircle(29, 20, 4);
        gfx.fillStyle(0x000000, 1);
        gfx.fillCircle(20, 20, 2);
        gfx.fillCircle(30, 20, 2);
        // Cone
        gfx.fillStyle(PVZ.COLORS.CONE_ORANGE, 1);
        gfx.fillTriangle(24, 0, 10, 18, 38, 18);
        gfx.lineStyle(2, 0xcc6600, 1);
        gfx.beginPath();
        gfx.moveTo(14, 14);
        gfx.lineTo(34, 14);
        gfx.strokePath();
        gfx.generateTexture('zombie_conehead', 48, 66);

        // --- Buckethead ---
        gfx.clear();
        gfx.fillStyle(PVZ.COLORS.ZOMBIE_SHIRT, 1);
        gfx.fillRect(12, 32, 24, 20);
        gfx.fillStyle(PVZ.COLORS.ZOMBIE_PANTS, 1);
        gfx.fillRect(12, 52, 10, 14);
        gfx.fillRect(26, 52, 10, 14);
        gfx.fillStyle(PVZ.COLORS.ZOMBIE_SKIN, 1);
        gfx.fillRect(0, 34, 12, 6);
        gfx.fillRect(36, 34, 12, 6);
        gfx.fillStyle(PVZ.COLORS.ZOMBIE_SKIN, 1);
        gfx.fillCircle(24, 24, 14);
        gfx.fillStyle(0xffff00, 1);
        gfx.fillCircle(19, 22, 4);
        gfx.fillCircle(29, 22, 4);
        gfx.fillStyle(0x000000, 1);
        gfx.fillCircle(20, 22, 2);
        gfx.fillCircle(30, 22, 2);
        // Bucket
        gfx.fillStyle(PVZ.COLORS.BUCKET_GRAY, 1);
        gfx.fillRect(8, 4, 32, 18);
        gfx.fillStyle(0x666666, 1);
        gfx.fillRect(8, 4, 32, 4);
        gfx.lineStyle(2, 0x555555, 1);
        gfx.strokeRect(8, 4, 32, 18);
        gfx.generateTexture('zombie_bucket', 48, 68);

        // --- Flag Zombie ---
        gfx.clear();
        gfx.fillStyle(PVZ.COLORS.ZOMBIE_SHIRT, 1);
        gfx.fillRect(12, 24, 24, 20);
        gfx.fillStyle(PVZ.COLORS.ZOMBIE_PANTS, 1);
        gfx.fillRect(12, 44, 10, 16);
        gfx.fillRect(26, 44, 10, 16);
        gfx.fillStyle(PVZ.COLORS.ZOMBIE_SKIN, 1);
        gfx.fillRect(0, 26, 12, 6);
        gfx.fillRect(36, 26, 12, 6);
        gfx.fillStyle(PVZ.COLORS.ZOMBIE_SKIN, 1);
        gfx.fillCircle(24, 14, 14);
        gfx.fillStyle(0xffff00, 1);
        gfx.fillCircle(19, 12, 4);
        gfx.fillCircle(29, 12, 4);
        gfx.fillStyle(0x000000, 1);
        gfx.fillCircle(20, 12, 2);
        gfx.fillCircle(30, 12, 2);
        // Flag pole
        gfx.fillStyle(0x8b4513, 1);
        gfx.fillRect(38, 0, 3, 30);
        // Flag
        gfx.fillStyle(PVZ.COLORS.FLAG_RED, 1);
        gfx.fillTriangle(41, 2, 56, 8, 41, 14);
        gfx.generateTexture('zombie_flag', 58, 60);

        // --- Projectile Pea ---
        gfx.clear();
        gfx.fillStyle(PVZ.COLORS.PEA_GREEN, 1);
        gfx.fillCircle(8, 8, 7);
        gfx.fillStyle(0x88ee88, 1);
        gfx.fillCircle(6, 6, 3);
        gfx.generateTexture('projectile_pea', 16, 16);

        // --- Frozen Pea ---
        gfx.clear();
        gfx.fillStyle(PVZ.COLORS.PEA_FROZEN, 1);
        gfx.fillCircle(8, 8, 7);
        gfx.fillStyle(0xaaeeff, 1);
        gfx.fillCircle(6, 6, 3);
        gfx.generateTexture('projectile_frozenpea', 16, 16);

        // --- Sun ---
        gfx.clear();
        gfx.fillStyle(PVZ.COLORS.SUN_GLOW, 0.3);
        gfx.fillCircle(20, 20, 18);
        gfx.fillStyle(PVZ.COLORS.SUN_YELLOW, 1);
        gfx.fillCircle(20, 20, 14);
        gfx.fillStyle(PVZ.COLORS.SUN_GLOW, 1);
        gfx.fillCircle(18, 16, 6);
        gfx.generateTexture('sun', 40, 40);

        // --- UI Button ---
        gfx.clear();
        gfx.fillStyle(0x5c8a2f, 1);
        gfx.fillRoundedRect(0, 0, 160, 50, 8);
        gfx.fillStyle(0x6b9f36, 1);
        gfx.fillRoundedRect(2, 2, 156, 46, 7);
        gfx.generateTexture('ui_button', 160, 50);

        // --- UI Button Small ---
        gfx.clear();
        gfx.fillStyle(0x5c8a2f, 1);
        gfx.fillRoundedRect(0, 0, 120, 40, 6);
        gfx.fillStyle(0x6b9f36, 1);
        gfx.fillRoundedRect(2, 2, 116, 36, 5);
        gfx.generateTexture('ui_button_small', 120, 40);

        gfx.destroy();
    }
};
