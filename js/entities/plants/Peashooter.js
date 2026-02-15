window.PVZ = window.PVZ || {};

PVZ.Peashooter = class Peashooter extends PVZ.Plant {
    constructor(scene, row, col) {
        super(scene, row, col, 'peashooter');
        this.gatlingActivated = false;
    }

    applyUpgrade() {
        // Gatling mode: attack rate doubles after 10s
        // Applied dynamically in update
    }

    hasZombieInRow() {
        const zombies = this.scene.zombiesGroup.getChildren();
        return zombies.some(z => z.isAlive && z.row === this.row && z.x > this.x);
    }

    performAction() {
        if (!this.hasZombieInRow()) return;

        PVZ.SoundManager.play('pea_shoot');
        const pea = new PVZ.Projectile(this.scene, this.x + 20, this.y, 'projectile_pea', this.plantData.damage);
        this.scene.projectilesGroup.add(pea);
    }

    update(time, delta) {
        if (!this.isAlive) return;

        // Gatling upgrade: double fire rate after 10 seconds
        if (this.hasUpgrade && !this.gatlingActivated && this.timeOnField >= 10000) {
            this.gatlingActivated = true;
            this.attackRate = this.plantData.attackRate / 2;
        }

        super.update(time, delta);
    }
};
