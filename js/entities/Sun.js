window.PVZ = window.PVZ || {};

PVZ.Sun = class Sun extends Phaser.GameObjects.Container {
    constructor(scene, x, startY, targetY, value) {
        super(scene, x, startY);

        this.value = value || PVZ.SUN_VALUE;
        this.collected = false;
        this.despawnTimer = 0;

        // Sprite
        this.sprite = scene.add.image(0, 0, 'sun');
        this.add(this.sprite);

        // Value text
        this.valueText = scene.add.text(0, 0, this.value.toString(), {
            fontSize: '11px',
            fontFamily: 'Arial',
            color: '#8b4513',
            fontStyle: 'bold'
        }).setOrigin(0.5);
        this.add(this.valueText);

        scene.add.existing(this);
        this.setDepth(10);
        this.setSize(36, 36);
        this.setInteractive(new Phaser.Geom.Circle(18, 18, 22), Phaser.Geom.Circle.Contains);

        // Fall to target
        scene.tweens.add({
            targets: this,
            y: targetY,
            duration: 1500 + Math.random() * 500,
            ease: 'Bounce.easeOut'
        });

        // Spin animation
        scene.tweens.add({
            targets: this.sprite,
            angle: 360,
            duration: 4000,
            repeat: -1,
            ease: 'Linear'
        });

        // Click to collect
        this.on('pointerdown', () => {
            this.collect();
        });
    }

    collect() {
        if (this.collected) return;
        this.collected = true;

        PVZ.SoundManager.play('sun_collect');

        const gameScene = this.scene.scene.get('GameScene') || this.scene;
        if (gameScene.sunManager) {
            gameScene.sunManager.addSun(this.value);
        }
        if (gameScene.scoreManager) {
            gameScene.scoreManager.addScore(PVZ.SCORE_SUN_COLLECT);
        }

        // Collect animation: fly to sun counter
        this.scene.tweens.add({
            targets: this,
            x: 50,
            y: 10,
            scaleX: 0.5,
            scaleY: 0.5,
            alpha: 0,
            duration: 400,
            ease: 'Power2',
            onComplete: () => {
                this.destroy();
            }
        });
    }

    update(time, delta) {
        if (this.collected) return;

        this.despawnTimer += delta;

        // Warning fade at 6 seconds
        if (this.despawnTimer >= PVZ.SUN_WARN_TIME && this.despawnTimer < PVZ.SUN_DESPAWN_TIME) {
            this.alpha = 0.5 + 0.5 * Math.sin(this.despawnTimer * 0.01);
        }

        // Despawn at 8 seconds
        if (this.despawnTimer >= PVZ.SUN_DESPAWN_TIME) {
            this.scene.tweens.add({
                targets: this,
                alpha: 0,
                duration: 200,
                onComplete: () => {
                    this.destroy();
                }
            });
        }
    }
};
