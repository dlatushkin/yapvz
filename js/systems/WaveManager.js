window.PVZ = window.PVZ || {};

PVZ.WaveManager = class WaveManager {
    constructor(scene, levelData) {
        this.scene = scene;
        this.levelData = levelData;
        this.waves = levelData.waves;
        this.currentWaveIndex = 0;
        this.waveTimer = 0;
        this.started = false;
        this.allWavesSpawned = false;
        this.totalZombiesSpawned = 0;
        this.totalZombiesKilled = 0;
        this.waveInProgress = false;
        this.pendingSpawns = [];
    }

    start() {
        this.started = true;
        this.waveTimer = 0;
        this.currentWaveIndex = 0;
        this.allWavesSpawned = false;
        this.waveInProgress = false;
    }

    spawnWave(waveIndex) {
        if (waveIndex >= this.waves.length) {
            this.allWavesSpawned = true;
            return;
        }

        const wave = this.waves[waveIndex];
        this.waveInProgress = true;

        // Check for flag zombie (huge wave warning)
        const hasFlag = wave.zombies.some(z => z.type === 'flag');
        if (hasFlag) {
            this.scene.game.events.emit('wave-warning');
            PVZ.SoundManager.play('wave_warning');
        }

        this.scene.game.events.emit('wave-start', waveIndex + 1, this.waves.length);

        wave.zombies.forEach(zombieInfo => {
            this.pendingSpawns.push({
                type: zombieInfo.type,
                lane: zombieInfo.lane,
                delay: zombieInfo.delay,
                timer: 0,
                spawned: false
            });
            this.totalZombiesSpawned++;
        });
    }

    onZombieKilled() {
        this.totalZombiesKilled++;
        this.checkLevelComplete();
    }

    checkLevelComplete() {
        if (this.allWavesSpawned &&
            this.pendingSpawns.every(s => s.spawned) &&
            this.totalZombiesKilled >= this.totalZombiesSpawned &&
            this.scene.zombiesGroup.countActive() === 0) {
            this.scene.game.events.emit('level-complete');
        }
    }

    update(time, delta) {
        if (!this.started) return;

        // Handle wave timing
        if (!this.allWavesSpawned && !this.waveInProgress) {
            this.waveTimer += delta;
            const nextWave = this.waves[this.currentWaveIndex];
            if (nextWave && this.waveTimer >= nextWave.delay) {
                this.waveTimer = 0;
                this.spawnWave(this.currentWaveIndex);
                this.currentWaveIndex++;
            }
        }

        // Handle pending spawns within current wave
        let allSpawned = true;
        this.pendingSpawns.forEach(spawn => {
            if (spawn.spawned) return;
            spawn.timer += delta;
            if (spawn.timer >= spawn.delay) {
                this.scene.spawnZombie(spawn.type, spawn.lane);
                spawn.spawned = true;
            } else {
                allSpawned = false;
            }
        });

        if (this.waveInProgress && allSpawned &&
            this.pendingSpawns.every(s => s.spawned)) {
            this.waveInProgress = false;
            this.pendingSpawns = [];
            if (this.currentWaveIndex >= this.waves.length) {
                this.allWavesSpawned = true;
            }
        }

        // Check completion periodically
        if (this.allWavesSpawned) {
            this.checkLevelComplete();
        }
    }
};
