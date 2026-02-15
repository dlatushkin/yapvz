window.PVZ = window.PVZ || {};

PVZ.LevelData = [
    {
        id: 1,
        name: 'Day 1: First Contact',
        startingSun: 150,
        naturalSunInterval: 8000,
        availablePlants: ['peashooter', 'sunflower', 'wallnut'],
        waves: [
            {
                delay: 15000,
                zombies: [
                    { type: 'regular', lane: 1, delay: 0 },
                    { type: 'regular', lane: 3, delay: 3000 }
                ]
            },
            {
                delay: 25000,
                zombies: [
                    { type: 'regular', lane: 0, delay: 0 },
                    { type: 'regular', lane: 2, delay: 1000 },
                    { type: 'regular', lane: 4, delay: 2000 }
                ]
            },
            {
                delay: 25000,
                zombies: [
                    { type: 'regular', lane: 0, delay: 0 },
                    { type: 'regular', lane: 1, delay: 500 },
                    { type: 'regular', lane: 2, delay: 1000 },
                    { type: 'regular', lane: 3, delay: 1500 },
                    { type: 'regular', lane: 4, delay: 2000 }
                ]
            }
        ]
    },
    {
        id: 2,
        name: 'Day 2: Armored Advance',
        startingSun: 100,
        naturalSunInterval: 7000,
        availablePlants: ['peashooter', 'sunflower', 'wallnut', 'snowpea', 'repeater'],
        waves: [
            {
                delay: 12000,
                zombies: [
                    { type: 'regular', lane: 2, delay: 0 },
                    { type: 'regular', lane: 4, delay: 2000 }
                ]
            },
            {
                delay: 22000,
                zombies: [
                    { type: 'conehead', lane: 1, delay: 0 },
                    { type: 'regular', lane: 3, delay: 1000 },
                    { type: 'regular', lane: 0, delay: 2000 }
                ]
            },
            {
                delay: 20000,
                zombies: [
                    { type: 'conehead', lane: 0, delay: 0 },
                    { type: 'conehead', lane: 4, delay: 1000 },
                    { type: 'regular', lane: 2, delay: 1500 },
                    { type: 'regular', lane: 2, delay: 3000 }
                ]
            },
            {
                delay: 18000,
                zombies: [
                    { type: 'flag', lane: 2, delay: 0 },
                    { type: 'conehead', lane: 1, delay: 500 },
                    { type: 'conehead', lane: 3, delay: 500 },
                    { type: 'regular', lane: 0, delay: 1000 },
                    { type: 'regular', lane: 4, delay: 1000 },
                    { type: 'regular', lane: 2, delay: 2000 }
                ]
            },
            {
                delay: 15000,
                zombies: [
                    { type: 'conehead', lane: 0, delay: 0 },
                    { type: 'conehead', lane: 1, delay: 500 },
                    { type: 'conehead', lane: 2, delay: 1000 },
                    { type: 'conehead', lane: 3, delay: 1500 },
                    { type: 'conehead', lane: 4, delay: 2000 },
                    { type: 'regular', lane: 2, delay: 3000 },
                    { type: 'regular', lane: 1, delay: 3500 }
                ]
            }
        ]
    },
    {
        id: 3,
        name: 'Day 3: Full Assault',
        startingSun: 50,
        naturalSunInterval: 6000,
        availablePlants: ['peashooter', 'sunflower', 'wallnut', 'snowpea', 'cherrybomb', 'repeater'],
        waves: [
            {
                delay: 10000,
                zombies: [
                    { type: 'regular', lane: 1, delay: 0 },
                    { type: 'regular', lane: 3, delay: 1000 },
                    { type: 'conehead', lane: 2, delay: 2000 }
                ]
            },
            {
                delay: 18000,
                zombies: [
                    { type: 'conehead', lane: 0, delay: 0 },
                    { type: 'conehead', lane: 4, delay: 500 },
                    { type: 'regular', lane: 2, delay: 1000 },
                    { type: 'regular', lane: 1, delay: 1500 },
                    { type: 'regular', lane: 3, delay: 2000 }
                ]
            },
            {
                delay: 18000,
                zombies: [
                    { type: 'buckethead', lane: 2, delay: 0 },
                    { type: 'conehead', lane: 0, delay: 1000 },
                    { type: 'conehead', lane: 4, delay: 1000 },
                    { type: 'regular', lane: 1, delay: 2000 },
                    { type: 'regular', lane: 3, delay: 2000 }
                ]
            },
            {
                delay: 16000,
                zombies: [
                    { type: 'flag', lane: 2, delay: 0 },
                    { type: 'buckethead', lane: 1, delay: 500 },
                    { type: 'buckethead', lane: 3, delay: 500 },
                    { type: 'conehead', lane: 0, delay: 1000 },
                    { type: 'conehead', lane: 4, delay: 1000 },
                    { type: 'regular', lane: 2, delay: 2000 },
                    { type: 'regular', lane: 2, delay: 3000 }
                ]
            },
            {
                delay: 15000,
                zombies: [
                    { type: 'buckethead', lane: 0, delay: 0 },
                    { type: 'buckethead', lane: 4, delay: 0 },
                    { type: 'conehead', lane: 1, delay: 1000 },
                    { type: 'conehead', lane: 2, delay: 1000 },
                    { type: 'conehead', lane: 3, delay: 1000 },
                    { type: 'regular', lane: 0, delay: 2000 },
                    { type: 'regular', lane: 4, delay: 2000 }
                ]
            },
            {
                delay: 14000,
                zombies: [
                    { type: 'conehead', lane: 0, delay: 0 },
                    { type: 'conehead', lane: 1, delay: 0 },
                    { type: 'conehead', lane: 2, delay: 0 },
                    { type: 'conehead', lane: 3, delay: 0 },
                    { type: 'conehead', lane: 4, delay: 0 },
                    { type: 'buckethead', lane: 1, delay: 2000 },
                    { type: 'buckethead', lane: 3, delay: 2000 },
                    { type: 'regular', lane: 2, delay: 3000 }
                ]
            },
            {
                delay: 12000,
                zombies: [
                    { type: 'flag', lane: 2, delay: 0 },
                    { type: 'buckethead', lane: 0, delay: 500 },
                    { type: 'buckethead', lane: 2, delay: 500 },
                    { type: 'buckethead', lane: 4, delay: 500 },
                    { type: 'conehead', lane: 1, delay: 1000 },
                    { type: 'conehead', lane: 3, delay: 1000 },
                    { type: 'regular', lane: 0, delay: 1500 },
                    { type: 'regular', lane: 1, delay: 1500 },
                    { type: 'regular', lane: 2, delay: 2000 },
                    { type: 'regular', lane: 3, delay: 2000 },
                    { type: 'regular', lane: 4, delay: 2000 }
                ]
            }
        ]
    }
];
