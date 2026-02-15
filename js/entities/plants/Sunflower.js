window.PVZ = window.PVZ || {};

PVZ.Sunflower = class Sunflower extends PVZ.Plant {
    constructor(scene, row, col) {
        super(scene, row, col, 'sunflower');
        this.sunValue = PVZ.SUN_VALUE;
    }

    applyUpgrade() {
        if (this.hasUpgrade) {
            this.sunValue = 100; // Twin sunflower: 100 sun instead of 50
        }
    }

    performAction() {
        this.scene.sunManager.spawnPlantSun(this.x, this.y);
    }
};
