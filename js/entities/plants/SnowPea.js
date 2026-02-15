window.PVZ = window.PVZ || {};

PVZ.SnowPea = class SnowPea extends PVZ.Plant {
    constructor(scene, row, col) {
        super(scene, row, col, 'snowpea');
    }

    hasZombieInRow() {
        const zombies = this.scene.zombiesGroup.getChildren();
        return zombies.some(z => z.isAlive && z.row === this.row && z.x > this.x);
    }

    performAction() {
        if (!this.hasZombieInRow()) return;

        PVZ.SoundManager.play('pea_shoot');
        const pea = new PVZ.FrozenPea(this.scene, this.x + 20, this.y, this.plantData.damage);
        this.scene.projectilesGroup.add(pea);
    }
};
