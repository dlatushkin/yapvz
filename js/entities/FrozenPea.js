window.PVZ = window.PVZ || {};

PVZ.FrozenPea = class FrozenPea extends PVZ.Projectile {
    constructor(scene, x, y, damage) {
        super(scene, x, y, 'projectile_frozenpea', damage);
        this.isSlowing = true;
    }

    onHit(zombie) {
        if (!zombie.isAlive) return;
        PVZ.SoundManager.play('pea_hit');
        zombie.takeDamage(this.damage);
        zombie.applySlowEffect(3000);
        this.destroy();
    }
};
