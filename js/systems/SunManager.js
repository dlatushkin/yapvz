window.PVZ = window.PVZ || {};

PVZ.SunManager = class SunManager {
    constructor(scene, startingSun) {
        this.scene = scene;
        this.currentSun = startingSun || 50;
        this.naturalSunInterval = 8000;
        this.naturalSunTimer = 0;
        this.sunsGroup = scene.add.group();
    }

    setInterval(interval) {
        this.naturalSunInterval = interval;
    }

    addSun(amount) {
        this.currentSun += amount;
        this.scene.game.events.emit('sun-changed', this.currentSun);
    }

    spendSun(amount) {
        if (this.currentSun >= amount) {
            this.currentSun -= amount;
            this.scene.game.events.emit('sun-changed', this.currentSun);
            return true;
        }
        return false;
    }

    canAfford(amount) {
        return this.currentSun >= amount;
    }

    spawnNaturalSun() {
        const minX = PVZ.GRID_OFFSET_X + 40;
        const maxX = PVZ.GRID_OFFSET_X + PVZ.GRID_COLS * PVZ.CELL_WIDTH - 40;
        const x = Phaser.Math.Between(minX, maxX);
        const targetY = Phaser.Math.Between(
            PVZ.GRID_OFFSET_Y + 40,
            PVZ.GRID_OFFSET_Y + PVZ.GRID_ROWS * PVZ.CELL_HEIGHT - 40
        );
        const sun = new PVZ.Sun(this.scene, x, -20, targetY, PVZ.SUN_VALUE);
        this.sunsGroup.add(sun);
    }

    spawnPlantSun(x, y) {
        const sun = new PVZ.Sun(this.scene, x, y, y - 40, PVZ.SUN_VALUE);
        this.sunsGroup.add(sun);
    }

    update(time, delta) {
        this.naturalSunTimer += delta;
        if (this.naturalSunTimer >= this.naturalSunInterval) {
            this.naturalSunTimer -= this.naturalSunInterval;
            this.spawnNaturalSun();
        }
    }
};
