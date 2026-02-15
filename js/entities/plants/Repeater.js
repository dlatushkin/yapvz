window.PVZ = window.PVZ || {};

PVZ.Repeater = class Repeater extends PVZ.Plant {
    constructor(scene, row, col) {
        super(scene, row, col, 'repeater');
        this.shotsPerVolley = 2;
    }

    applyUpgrade() {
        if (this.hasUpgrade) {
            this.shotsPerVolley = 3; // Triple shot
        }
    }

    hasZombieInRow() {
        const zombies = this.scene.zombiesGroup.getChildren();
        return zombies.some(z => z.isAlive && z.row === this.row && z.x > this.x);
    }

    performAction() {
        if (!this.hasZombieInRow()) return;

        for (let i = 0; i < this.shotsPerVolley; i++) {
            this.scene.time.delayedCall(i * 150, () => {
                if (!this.isAlive) return;
                PVZ.SoundManager.play('pea_shoot');
                const pea = new PVZ.Projectile(this.scene, this.x + 20, this.y, 'projectile_pea', this.plantData.damage);
                this.scene.projectilesGroup.add(pea);
            });
        }
    }
};
