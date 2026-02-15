window.PVZ = window.PVZ || {};

PVZ.PlantData = {
    peashooter: {
        name: 'Peashooter',
        cost: 100,
        cooldown: 5000,
        hp: 300,
        damage: 20,
        attackRate: 1500,
        textureKey: 'plant_peashooter',
        cardColor: 0x44aa44,
        upgrade: {
            name: 'Gatling Mode',
            description: 'Attack rate doubles after 10s on field',
            effect: 'gatling'
        }
    },
    sunflower: {
        name: 'Sunflower',
        cost: 50,
        cooldown: 5000,
        hp: 300,
        damage: 0,
        attackRate: 24000,
        textureKey: 'plant_sunflower',
        cardColor: 0xffcc00,
        upgrade: {
            name: 'Twin Sunflower',
            description: 'Produces 100 sun instead of 50',
            effect: 'twinsun'
        }
    },
    wallnut: {
        name: 'Wall-nut',
        cost: 50,
        cooldown: 20000,
        hp: 4000,
        damage: 0,
        attackRate: 0,
        textureKey: 'plant_wallnut',
        cardColor: 0x8b6914,
        upgrade: {
            name: 'Armor Plating',
            description: 'HP increases to 6000',
            effect: 'armor'
        }
    },
    snowpea: {
        name: 'Snow Pea',
        cost: 175,
        cooldown: 5000,
        hp: 300,
        damage: 20,
        attackRate: 1500,
        textureKey: 'plant_snowpea',
        cardColor: 0x44aadd,
        upgrade: {
            name: 'Deep Freeze',
            description: 'Slowed zombies take +10 damage from all sources',
            effect: 'deepfreeze'
        }
    },
    cherrybomb: {
        name: 'Cherry Bomb',
        cost: 150,
        cooldown: 30000,
        hp: 300,
        damage: 1800,
        attackRate: 0,
        textureKey: 'plant_cherrybomb',
        cardColor: 0xcc2222,
        upgrade: {
            name: 'Napalm',
            description: 'Leaves burning tile for 5s dealing 50 dps',
            effect: 'napalm'
        }
    },
    repeater: {
        name: 'Repeater',
        cost: 200,
        cooldown: 5000,
        hp: 300,
        damage: 20,
        attackRate: 1500,
        textureKey: 'plant_repeater',
        cardColor: 0x337733,
        upgrade: {
            name: 'Triple Shot',
            description: 'Fires 3 peas instead of 2',
            effect: 'triple'
        }
    },
    potatomine: {
        name: 'Potato Mine',
        cost: 25,
        cooldown: 20000,
        hp: 300,
        damage: 1800,
        attackRate: 0,
        textureKey: 'plant_potatomine',
        cardColor: 0x8B4513,
        upgrade: {
            name: 'Spud Spray',
            description: 'Explosion damages adjacent tiles for 50% damage',
            effect: 'spudspray'
        }
    }
};
