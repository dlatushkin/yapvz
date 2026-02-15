window.PVZ = window.PVZ || {};

PVZ.RegularZombie = class RegularZombie extends PVZ.Zombie {
    constructor(scene, row) {
        super(scene, row, 'regular');
    }
};
