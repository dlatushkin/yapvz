window.PVZ = window.PVZ || {};

PVZ.GameScene = class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    init(data) {
        this.levelId = data.levelId || 1;
    }

    create() {
        this.levelData = PVZ.LevelData[this.levelId - 1];
        this.gameOver = false;
        this.selectedPlant = null;
        this.previewGraphics = null;

        // Initialize managers
        this.gridManager = new PVZ.GridManager(this);
        // this.sunManager = new PVZ.SunManager(this, this.levelData.startingSun);
        // this.sunManager.setInterval(this.levelData.naturalSunInterval);
        // this.scoreManager = new PVZ.ScoreManager(this);
        // this.waveManager = new PVZ.WaveManager(this, this.levelData);

        // // Groups (non-physics, we handle collisions manually)
        // this.plantsGroup = this.add.group();
        // this.zombiesGroup = this.add.group();
        // this.projectilesGroup = this.add.group();

        // Draw lawn
        this.gridManager.drawLawn();

        // // Grid click for plant placement
        // this.input.on('pointerdown', (pointer) => {
        //     if (pointer.rightButtonDown()) {
        //         this.cancelPlacement();
        //     } else {
        //         this.onGridClick(pointer);
        //     }
        // });

        // this.input.keyboard.on('keydown-ESC', () => {
        //     this.cancelPlacement();
        // });

        // // Preview sprite that follows cursor
        // this.input.on('pointermove', (pointer) => {
        //     this.updatePlacementPreview(pointer);
        // });

        // Event listeners
        this.game.events.on('plant-selected', (type) => {
            this.selectedPlant = type;
        });

        this.game.events.on('plant-deselected', () => {
            this.selectedPlant = null;
            if (this.previewGraphics) {
                this.previewGraphics.clear();
            }
        });

        // this.game.events.on('level-complete', () => {
        //     if (this.gameOver) return;
        //     this.gameOver = true;
        //     this.scoreManager.addScore(PVZ.SCORE_LEVEL_COMPLETE);
        //     this.scoreManager.saveLevelScore(this.levelId);
        //     this.scene.pause('GameScene');
        //     this.scene.pause('HUDScene');
        //     this.scene.launch('WinScene', {
        //         score: this.scoreManager.getScore(),
        //         levelId: this.levelId
        //     });
        // });

        // this.game.events.on('game-over', () => {
        //     if (this.gameOver) return;
        //     this.gameOver = true;
        //     this.scene.pause('GameScene');
        //     this.scene.pause('HUDScene');
        //     this.scene.launch('LoseScene', {
        //         levelId: this.levelId
        //     });
        // });

        // // Preview graphics layer
        // this.previewGraphics = this.add.graphics();
        // this.previewGraphics.setDepth(50);

        // Launch HUD
        this.scene.launch('HUDScene', {
            levelData: this.levelData,
            levelId: this.levelId
        });

        // // Start waves
        // this.waveManager.start();

        // // Emit initial sun value
        // this.game.events.emit('sun-changed', this.sunManager.currentSun);
    }

    updatePlacementPreview(pointer) {
        if (!this.previewGraphics) return;
        this.previewGraphics.clear();

        if (!this.selectedPlant) return;

        const { row, col } = this.gridManager.worldToGrid(pointer.x, pointer.y);
        if (!this.gridManager.isValidCell(row, col)) return;

        const pos = this.gridManager.gridToWorld(row, col);
        const isOccupied = this.gridManager.isOccupied(row, col);

        const color = isOccupied ? 0xff0000 : 0x00ff00;
        this.previewGraphics.fillStyle(color, 0.3);
        this.previewGraphics.fillRect(
            pos.x - PVZ.CELL_WIDTH / 2,
            pos.y - PVZ.CELL_HEIGHT / 2,
            PVZ.CELL_WIDTH,
            PVZ.CELL_HEIGHT
        );
    }

    onGridClick(pointer) {
        if (!this.selectedPlant) return;

        const { row, col } = this.gridManager.worldToGrid(pointer.x, pointer.y);
        if (!this.gridManager.isValidCell(row, col)) return;
        if (this.gridManager.isOccupied(row, col)) return;

        const data = PVZ.PlantData[this.selectedPlant];
        if (!this.sunManager.canAfford(data.cost)) return;

        // Place the plant
        this.sunManager.spendSun(data.cost);
        const plant = this.createPlant(this.selectedPlant, row, col);

        if (plant) {
            this.gridManager.placePlant(row, col, plant);
            this.plantsGroup.add(plant);
            PVZ.SoundManager.play('plant_place');

            // Start cooldown in HUD
            this.game.events.emit('plant-placed', this.selectedPlant);

            // Deselect after placing
            this.selectedPlant = null;
            this.game.events.emit('plant-deselected');
        }
    }

    createPlant(type, row, col) {
        switch (type) {
            case 'peashooter': return new PVZ.Peashooter(this, row, col);
            case 'sunflower': return new PVZ.Sunflower(this, row, col);
            case 'wallnut': return new PVZ.WallNut(this, row, col);
            case 'snowpea': return new PVZ.SnowPea(this, row, col);
            case 'cherrybomb': return new PVZ.CherryBomb(this, row, col);
            case 'repeater': return new PVZ.Repeater(this, row, col);
            case 'potatomine': return new PVZ.PotatoMine(this, row, col);
            default: return null;
        }
    }

    spawnZombie(type, lane) {
        let zombie;
        switch (type) {
            case 'regular': zombie = new PVZ.RegularZombie(this, lane); break;
            case 'conehead': zombie = new PVZ.ConeheadZombie(this, lane); break;
            case 'buckethead': zombie = new PVZ.BucketZombie(this, lane); break;
            case 'flag': zombie = new PVZ.FlagZombie(this, lane); break;
            default: zombie = new PVZ.RegularZombie(this, lane); break;
        }
        this.zombiesGroup.add(zombie);
        return zombie;
    }

    cancelPlacement() {
        this.selectedPlant = null;
        if (this.previewGraphics) {
            this.previewGraphics.clear();
        }
        this.game.events.emit('plant-deselected');
    }

    checkProjectileCollisions() {
        const projectiles = this.projectilesGroup.getChildren().slice();
        const zombies = this.zombiesGroup.getChildren();

        projectiles.forEach(proj => {
            if (!proj || !proj.active) return;

            for (let i = 0; i < zombies.length; i++) {
                const zombie = zombies[i];
                if (!zombie || !zombie.isAlive) continue;

                // Simple bounding box check
                const dx = Math.abs(proj.x - zombie.x);
                const dy = Math.abs(proj.y - zombie.y);

                if (dx < 25 && dy < 30) {
                    if (proj.onHit) {
                        proj.onHit(zombie);
                    } else {
                        zombie.takeDamage(proj.damage || 20);
                        proj.destroy();
                    }
                    break;
                }
            }
        });
    }

    checkZombieEating(zombie) {
        if (!zombie.isAlive) return;

        if (zombie.isEating) {
            if (!zombie.eatTarget || !zombie.eatTarget.isAlive) {
                zombie.stopEating();
            }
            return;
        }

        // Check for plants in this zombie's row
        for (let c = 0; c < PVZ.GRID_COLS; c++) {
            const plant = this.gridManager.getPlantAt(zombie.row, c);
            if (!plant || !plant.isAlive) continue;

            const dist = Math.abs(zombie.x - plant.x);
            if (dist < 30 && zombie.x > plant.x - 15) {
                zombie.startEating(plant);
                return;
            }
        }
    }

    update(time, delta) {
        if (this.gameOver) return;

        // // Update all plants
        // this.plantsGroup.getChildren().forEach(plant => {
        //     if (plant.update) plant.update(time, delta);
        // });

        // // Update all zombies
        // this.zombiesGroup.getChildren().forEach(zombie => {
        //     if (!zombie.isAlive) return;
        //     if (zombie.update) zombie.update(time, delta);
        //     this.checkZombieEating(zombie);

        //     // Check if zombie reached the house
        //     if (zombie.x < PVZ.GRID_OFFSET_X - 40) {
        //         this.game.events.emit('game-over');
        //     }
        // });

        // // Update projectiles (remove off-screen)
        // this.projectilesGroup.getChildren().forEach(proj => {
        //     if (proj.update) proj.update();
        // });

        // // Manual collision detection
        // this.checkProjectileCollisions();

        // // Update suns
        // if (this.sunManager.sunsGroup) {
        //     this.sunManager.sunsGroup.getChildren().forEach(sun => {
        //         if (sun.update) sun.update(time, delta);
        //     });
        // }

        // // Update managers
        // this.sunManager.update(time, delta);
        // this.waveManager.update(time, delta);
    }

    shutdown() {
        // Clean up event listeners
        this.game.events.off('plant-selected');
        this.game.events.off('plant-deselected');
        this.game.events.off('level-complete');
        this.game.events.off('game-over');
        this.game.events.off('plant-placed');
        this.game.events.off('wave-warning');
        this.game.events.off('wave-start');
    }
};
