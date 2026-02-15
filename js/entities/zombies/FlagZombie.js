window.PVZ = window.PVZ || {};

PVZ.FlagZombie = class FlagZombie extends PVZ.Zombie {
    constructor(scene, row) {
        super(scene, row, 'flag');
    }
};
