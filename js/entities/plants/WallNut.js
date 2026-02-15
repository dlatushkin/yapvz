window.PVZ = window.PVZ || {};

PVZ.WallNut = class WallNut extends PVZ.Plant {
    constructor(scene, row, col) {
        super(scene, row, col, 'wallnut');
        this.crackState = 0; // 0 = full, 1 = cracked, 2 = very cracked
    }

    applyUpgrade() {
        if (this.hasUpgrade) {
            this.hp = 6000;
            this.maxHp = 6000;
        }
    }

    takeDamage(amount) {
        super.takeDamage(amount);

        // Update crack visuals
        const pct = this.hp / this.maxHp;
        if (pct < 0.33 && this.crackState < 2) {
            this.crackState = 2;
            this.sprite.setTint(0x664400);
        } else if (pct < 0.66 && this.crackState < 1) {
            this.crackState = 1;
            this.sprite.setTint(0x886622);
        }
    }

    performAction() {
        // Wall-nut doesn't perform actions
    }
};
