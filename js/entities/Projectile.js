window.PVZ = window.PVZ || {};

PVZ.Projectile = class Projectile extends Phaser.GameObjects.Image {
    constructor(scene, x, y, textureKey, damage) {
        super(scene, x, y, textureKey || 'projectile_pea');

        this.damage = damage || 20;
        this.isSlowing = false;
        this.speed = PVZ.PROJECTILE_SPEED;

        scene.add.existing(this);
        this.setDepth(3);
    }

    onHit(zombie) {
        if (!zombie.isAlive) return;
        PVZ.SoundManager.play('pea_hit');
        zombie.takeDamage(this.damage);
        this.destroy();
    }

    update(time, delta) {
        this.x += this.speed / 60;

        if (this.x > PVZ.GAME_WIDTH + 20) {
            this.destroy();
        }
    }
};
