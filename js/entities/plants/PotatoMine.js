window.PVZ = window.PVZ || {};

PVZ.PotatoMine = class PotatoMine extends PVZ.Plant {
    constructor(scene, row, col) {
        super(scene, row, col, 'potatomine');
        this.armed = false;
        this.armingTime = 15000; // 15 seconds to arm
        
        // Start as dormant (smaller and darker)
        this.sprite.setScale(0.8);
        this.sprite.setTint(0x888888);
        
        // Arm after delay
        scene.time.delayedCall(this.armingTime, () => {
            this.arm();
        });
    }
    
    arm() {
        if (!this.isAlive) return;
        
        this.armed = true;
        
        // Visual feedback that it's armed
        this.sprite.setScale(1.0);
        this.sprite.clearTint();
        
        // Subtle pulsing to show it's armed
        this.scene.tweens.add({
            targets: this.sprite,
            alpha: 0.8,
            duration: 1000,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
        
        PVZ.SoundManager.play('potato_arm');
    }
    
    checkForZombies() {
        if (!this.armed || !this.isAlive) return;
        
        // Check if any zombie is on this tile
        const zombies = this.scene.zombiesGroup.getChildren();
        for (let zombie of zombies) {
            if (!zombie.isAlive || zombie.row !== this.row) continue;
            
            const zombieCol = Math.floor((zombie.x - PVZ.GRID_OFFSET_X) / PVZ.CELL_WIDTH);
            if (zombieCol === this.col) {
                // Zombie stepped on the mine!
                this.explode();
                return;
            }
        }
    }
    
    explode() {
        if (!this.isAlive) return;
        
        PVZ.SoundManager.play('potato_explode');
        
        // Deal massive damage to zombies on this tile
        const zombies = this.scene.zombiesGroup.getChildren();
        zombies.forEach(zombie => {
            if (!zombie.isAlive || zombie.row !== this.row) return;
            
            const zombieCol = Math.floor((zombie.x - PVZ.GRID_OFFSET_X) / PVZ.CELL_WIDTH);
            if (zombieCol === this.col) {
                zombie.takeDamage(this.plantData.damage);
            }
        });
        
        // Explosion visual
        const explosion = this.scene.add.circle(this.x, this.y, 5, 0xffaa00, 0.9);
        explosion.setDepth(20);
        this.scene.tweens.add({
            targets: explosion,
            radius: 80,
            scaleX: 1.2,
            scaleY: 1.2,
            alpha: 0,
            duration: 400,
            onComplete: () => {
                explosion.destroy();
            }
        });
        
        // Spud spray upgrade: damage adjacent tiles
        if (this.hasUpgrade) {
            this.createSpudSpray();
        }
        
        // Destroy self
        this.die();
    }
    
    createSpudSpray() {
        // Damage zombies in adjacent tiles (left and right)
        const zombies = this.scene.zombiesGroup.getChildren();
        zombies.forEach(zombie => {
            if (!zombie.isAlive || zombie.row !== this.row) return;
            
            const zombieCol = Math.floor((zombie.x - PVZ.GRID_OFFSET_X) / PVZ.CELL_WIDTH);
            const colDiff = Math.abs(zombieCol - this.col);
            if (colDiff === 1) { // Adjacent tiles
                zombie.takeDamage(this.plantData.damage * 0.5); // Half damage
                
                // Visual effect for spray damage
                const spray = this.scene.add.circle(zombie.x, zombie.y, 3, 0x8B4513, 0.7);
                spray.setDepth(19);
                this.scene.tweens.add({
                    targets: spray,
                    radius: 30,
                    alpha: 0,
                    duration: 300,
                    onComplete: () => spray.destroy()
                });
            }
        });
    }
    
    performAction() {
        this.checkForZombies();
    }
    
    update() {
        super.update();
        if (this.armed) {
            this.checkForZombies();
        }
    }
};