window.PVZ = window.PVZ || {};

PVZ.Plant = class Plant extends Phaser.GameObjects.Container {
    constructor(scene, row, col, type) {
        const pos = scene.gridManager.gridToWorld(row, col);
        super(scene, pos.x, pos.y);

        this.row = row;
        this.col = col;
        this.type = type;
        this.plantData = PVZ.PlantData[type];
        this.hp = this.plantData.hp;
        this.maxHp = this.plantData.hp;
        this.attackRate = this.plantData.attackRate;
        this.attackTimer = 0;
        this.isAlive = true;
        this.timeOnField = 0;

        // Check for upgrades
        const upgrades = PVZ.ScoreManager.getUpgrades();
        this.hasUpgrade = !!upgrades[type];

        // Apply upgrade effects
        this.applyUpgrade();

        // Create sprite
        this.sprite = scene.add.image(0, 0, this.plantData.textureKey);
        this.add(this.sprite);

        // Health bar (only for plants with significant HP)
        if (this.maxHp > 300) {
            this.healthBarBg = scene.add.graphics();
            this.healthBarFg = scene.add.graphics();
            this.add(this.healthBarBg);
            this.add(this.healthBarFg);
            this.updateHealthBar();
        }

        scene.add.existing(this);
        this.setDepth(1);

        // Idle animation
        scene.tweens.add({
            targets: this.sprite,
            scaleY: 0.95,
            duration: 800 + Math.random() * 400,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
    }

    applyUpgrade() {
        // Override in subclasses
    }

    takeDamage(amount) {
        if (!this.isAlive) return;

        // Deep freeze upgrade: slowed zombies deal less? No, deep freeze makes slowed zombies take more damage.
        this.hp -= amount;
        if (this.healthBarFg) this.updateHealthBar();

        // Flash effect
        this.sprite.setTint(0xff0000);
        this.scene.time.delayedCall(100, () => {
            if (this.sprite && this.sprite.active) {
                this.sprite.clearTint();
            }
        });

        if (this.hp <= 0) {
            this.die();
        }
    }

    updateHealthBar() {
        if (!this.healthBarBg || !this.healthBarFg) return;
        const w = 50;
        const h = 5;
        const y = -this.sprite.height / 2 - 10;

        this.healthBarBg.clear();
        this.healthBarBg.fillStyle(0x000000, 0.5);
        this.healthBarBg.fillRect(-w / 2, y, w, h);

        this.healthBarFg.clear();
        const pct = Math.max(0, this.hp / this.maxHp);
        const color = pct > 0.5 ? PVZ.COLORS.HEALTH_GREEN : PVZ.COLORS.HEALTH_RED;
        this.healthBarFg.fillStyle(color, 1);
        this.healthBarFg.fillRect(-w / 2, y, w * pct, h);
    }

    die() {
        this.isAlive = false;
        this.scene.gridManager.removePlant(this.row, this.col);

        // Death animation
        this.scene.tweens.add({
            targets: this,
            alpha: 0,
            scaleX: 0.5,
            scaleY: 0.5,
            duration: 300,
            onComplete: () => {
                this.destroy();
            }
        });
    }

    performAction() {
        // Override in subclasses
    }

    update(time, delta) {
        if (!this.isAlive) return;

        this.timeOnField += delta;

        if (this.attackRate > 0) {
            this.attackTimer += delta;
            if (this.attackTimer >= this.attackRate) {
                this.attackTimer = 0;
                this.performAction();
            }
        }
    }
};
