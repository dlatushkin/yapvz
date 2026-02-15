window.PVZ = window.PVZ || {};

PVZ.Zombie = class Zombie extends Phaser.GameObjects.Container {
    constructor(scene, row, type) {
        const startX = PVZ.GAME_WIDTH + Phaser.Math.Between(10, 80);
        const pos = scene.gridManager.gridToWorld(row, 0);
        super(scene, startX, pos.y);

        this.row = row;
        this.type = type;
        this.zombieData = PVZ.ZombieData[type];
        this.hp = this.zombieData.hp;
        this.maxHp = this.zombieData.hp;
        this.speed = this.zombieData.speed;
        this.currentSpeed = this.zombieData.speed;
        this.damage = this.zombieData.damage;
        this.biteRate = this.zombieData.biteRate;
        this.biteTimer = 0;
        this.isEating = false;
        this.eatTarget = null;
        this.isAlive = true;
        this.slowTimer = 0;
        this.isSlowed = false;

        // Create sprite
        this.sprite = scene.add.image(0, 0, this.zombieData.textureKey);
        this.add(this.sprite);

        // Health bar
        this.healthBarBg = scene.add.graphics();
        this.healthBarFg = scene.add.graphics();
        this.add(this.healthBarBg);
        this.add(this.healthBarFg);
        this.updateHealthBar();

        scene.add.existing(this);
        this.setDepth(2);

        // Walk bob animation
        scene.tweens.add({
            targets: this.sprite,
            y: -3,
            duration: 300,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
    }

    updateHealthBar() {
        const w = 40;
        const h = 4;
        const barY = -this.sprite.height / 2 - 8;

        this.healthBarBg.clear();
        this.healthBarBg.fillStyle(0x000000, 0.5);
        this.healthBarBg.fillRect(-w / 2, barY, w, h);

        this.healthBarFg.clear();
        const pct = Math.max(0, this.hp / this.maxHp);
        const color = pct > 0.5 ? PVZ.COLORS.HEALTH_GREEN : PVZ.COLORS.HEALTH_RED;
        this.healthBarFg.fillStyle(color, 1);
        this.healthBarFg.fillRect(-w / 2, barY, w * pct, h);
    }

    takeDamage(amount) {
        if (!this.isAlive) return;

        // Deep freeze bonus
        if (this.isSlowed) {
            const upgrades = PVZ.ScoreManager.getUpgrades();
            if (upgrades['snowpea']) {
                amount += 10;
            }
        }

        this.hp -= amount;
        this.updateHealthBar();

        // Flash
        this.sprite.setTint(0xff0000);
        this.scene.time.delayedCall(80, () => {
            if (this.sprite && this.sprite.active) {
                if (this.isSlowed) {
                    this.sprite.setTint(0x8888ff);
                } else {
                    this.sprite.clearTint();
                }
            }
        });

        if (this.hp <= 0) {
            this.die();
        }
    }

    applySlowEffect(duration) {
        this.isSlowed = true;
        this.slowTimer = duration;
        this.currentSpeed = this.speed * 0.5;
        if (this.sprite && this.sprite.active) {
            this.sprite.setTint(0x8888ff);
        }
    }

    startEating(plant) {
        if (this.isEating) return;
        this.isEating = true;
        this.eatTarget = plant;
        this.biteTimer = 0;
    }

    stopEating() {
        this.isEating = false;
        this.eatTarget = null;
    }

    die() {
        this.isAlive = false;
        PVZ.SoundManager.play('zombie_die');

        if (this.scene && this.scene.scoreManager) {
            this.scene.scoreManager.addScore(this.zombieData.scoreValue);
        }
        if (this.scene && this.scene.waveManager) {
            this.scene.waveManager.onZombieKilled();
        }

        // Death animation
        if (this.scene) {
            this.scene.tweens.add({
                targets: this,
                alpha: 0,
                y: this.y + 20,
                scaleX: 1.2,
                scaleY: 0.3,
                duration: 400,
                onComplete: () => {
                    this.destroy();
                }
            });
        }
    }

    update(time, delta) {
        if (!this.isAlive) return;

        // Slow timer
        if (this.isSlowed) {
            this.slowTimer -= delta;
            if (this.slowTimer <= 0) {
                this.isSlowed = false;
                this.currentSpeed = this.speed;
                if (this.sprite && this.sprite.active) {
                    this.sprite.clearTint();
                }
            }
        }

        // Movement (manual, not physics-based)
        if (!this.isEating) {
            this.x -= this.currentSpeed * (delta / 1000);
        }

        // Eating logic
        if (this.isEating) {
            if (!this.eatTarget || !this.eatTarget.isAlive) {
                this.stopEating();
                return;
            }

            this.biteTimer += delta;
            if (this.biteTimer >= this.biteRate) {
                this.biteTimer = 0;
                PVZ.SoundManager.play('zombie_bite');
                this.eatTarget.takeDamage(this.damage);
            }
        }
    }
};
