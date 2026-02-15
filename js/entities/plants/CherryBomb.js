window.PVZ = window.PVZ || {};

PVZ.CherryBomb = class CherryBomb extends PVZ.Plant {
    constructor(scene, row, col) {
        super(scene, row, col, 'cherrybomb');
        this.fused = false;

        // Start fuse timer - explode after 1 second
        scene.time.delayedCall(1000, () => {
            this.explode();
        });

        // Fuse animation: pulsing scale
        scene.tweens.add({
            targets: this.sprite,
            scaleX: 1.2,
            scaleY: 1.2,
            duration: 200,
            yoyo: true,
            repeat: 4,
            ease: 'Sine.easeInOut'
        });
    }

    explode() {
        if (!this.isAlive) return;

        PVZ.SoundManager.play('cherry_explode');

        // Deal damage to all zombies in 3x3 area
        const zombies = this.scene.zombiesGroup.getChildren();
        zombies.forEach(zombie => {
            if (!zombie.isAlive) return;
            const rowDiff = Math.abs(zombie.row - this.row);
            const zombieCol = Math.floor((zombie.x - PVZ.GRID_OFFSET_X) / PVZ.CELL_WIDTH);
            const colDiff = Math.abs(zombieCol - this.col);
            if (rowDiff <= 1 && colDiff <= 1) {
                zombie.takeDamage(this.plantData.damage);
            }
        });

        // Explosion visual
        const explosion = this.scene.add.circle(this.x, this.y, 10, 0xff6600, 0.8);
        explosion.setDepth(20);
        this.scene.tweens.add({
            targets: explosion,
            radius: 120,
            scaleX: 1.5,
            scaleY: 1.5,
            alpha: 0,
            duration: 500,
            onComplete: () => {
                explosion.destroy();
            }
        });

        // Napalm upgrade: leave burning tile
        if (this.hasUpgrade) {
            this.createNapalm();
        }

        // Destroy self
        this.die();
    }

    createNapalm() {
        const fireTile = this.scene.add.graphics();
        fireTile.fillStyle(0xff4400, 0.4);
        fireTile.fillRect(
            -PVZ.CELL_WIDTH / 2,
            -PVZ.CELL_HEIGHT / 2,
            PVZ.CELL_WIDTH,
            PVZ.CELL_HEIGHT
        );
        fireTile.setPosition(this.x, this.y);
        fireTile.setDepth(0.5);

        let napalmTimer = 0;
        const napalmDps = 50;
        const napalmDuration = 5000;
        const row = this.row;
        const scene = this.scene;

        const updateEvent = scene.time.addEvent({
            delay: 500,
            repeat: 9,
            callback: () => {
                const zombies = scene.zombiesGroup.getChildren();
                zombies.forEach(zombie => {
                    if (!zombie.isAlive || zombie.row !== row) return;
                    const zombieCol = Math.floor((zombie.x - PVZ.GRID_OFFSET_X) / PVZ.CELL_WIDTH);
                    if (zombieCol === this.col) {
                        zombie.takeDamage(napalmDps * 0.5);
                    }
                });
            }
        });

        scene.time.delayedCall(napalmDuration, () => {
            fireTile.destroy();
        });
    }

    performAction() {
        // Cherry bomb doesn't use the regular action system
    }
};
