window.PVZ = window.PVZ || {};

PVZ.PlantBar = class PlantBar {
    constructor(scene, availablePlants) {
        this.scene = scene;
        this.availablePlants = availablePlants;
        this.cards = [];
        this.selectedPlant = null;
        this.cooldowns = {};
        this.previewSprite = null;

        availablePlants.forEach(type => {
            this.cooldowns[type] = 0;
        });

        this.createCards();
    }

    createCards() {
        const startX = PVZ.GRID_OFFSET_X + 10;
        const y = 10;
        const cardWidth = 70;
        const cardHeight = 60;
        const gap = 5;

        this.availablePlants.forEach((type, i) => {
            console.log('Creating card for plant type:', type);

            const data = PVZ.PlantData[type];
            const x = startX + i * (cardWidth + gap);

            const card = this.scene.add.rectangle(x, y, cardWidth, cardWidth, 0x4a3520).setInteractive();
            // const text = this.scene.add.text(x + cardWidth / 2, y + cardHeight / 2, data.name, {
            //     fontSize: '12px',
            //     fontFamily: 'Arial',
            //     color: '#ffffff',
            //     fontStyle: 'bold'
            // }).setOrigin(0.5);

            // btn.on('pointerdown', () => {
            //     this.onCardClicked(type);
            // });

            card.on('pointerover', () => {
                console.log('Pointer over card:', type);
                if (this.canSelect(type)) {
                    card.setScale(1.05);
                    // text.setScale(1.05);
                }
            });

            card.on('pointerout', () => {
                card.setScale(1);
                // text.setScale(1);
            });

            // const container = this.scene.add.container(x, y);
            // container.setSize(cardWidth, cardHeight);
            // container.setInteractive();
            // // container.setInteractive(new Phaser.Geom.Rectangle(0, 0, cardWidth, cardHeight), Phaser.Geom.Rectangle.Contains);
            // container.setDepth(1000);
            // console.log('Created interactive container for:', type);

            // // Card background
            // const bg = this.scene.add.graphics();
            // // bg.fillStyle(0x4a3520, 1);
            // // bg.fillRoundedRect(0, 0, cardWidth, cardHeight, 4);
            // bg.lineStyle(2, 0x8b7355, 1);
            // bg.strokeRoundedRect(0, 0, cardWidth, cardHeight, 4);
            // container.add(bg);

            // // // // Plant icon
            // // // const icon = this.scene.add.image(cardWidth / 2, 22, data.textureKey);
            // // // icon.setScale(0.5);
            // // // container.add(icon);

            // // // // Cost text
            // // // const costText = this.scene.add.text(cardWidth / 2, 48, data.cost.toString(), {
            // // //     fontSize: '12px',
            // // //     fontFamily: 'Arial',
            // // //     color: '#ffdd00',
            // // //     fontStyle: 'bold'
            // // // }).setOrigin(0.5);
            // // // container.add(costText);

            // // // // Cooldown overlay
            // // // const cooldownOverlay = this.scene.add.graphics();
            // // // cooldownOverlay.setAlpha(0);
            // // // container.add(cooldownOverlay);

            // // // // Affordability overlay
            // // // const affordOverlay = this.scene.add.graphics();
            // // // container.add(affordOverlay);

            // // // // Cooldown timer text
            // // // const cooldownText = this.scene.add.text(cardWidth / 2, cardHeight / 2, '', {
            // // //     fontSize: '14px',
            // // //     fontFamily: 'Arial',
            // // //     color: '#ffffff',
            // // //     fontStyle: 'bold',
            // // //     stroke: '#000000',
            // // //     strokeThickness: 2
            // // // }).setOrigin(0.5).setAlpha(0);
            // // // container.add(cooldownText);

            // // container.on('pointerdown', () => {
            // //     this.onCardClicked(type);
            // // });

            // container.on('pointermove', (pointer, localX, localY, event) => {
            //     console.log('pointermove on card: ', type, ' ', pointer.worldX, ' ', pointer.worldY);
            // });

            // container.on('pointerover', (pointer, localX, localY, event) => {
            //     console.log('pointover: ', type, ' ', pointer.worldX, ' ', pointer.worldY);
            //     // console.log('Pointer over card:', type, 'Scene active:', this.scene.scene.isActive(), 'Depth:', container.depth);
            //     // if (this.canSelect(type)) {
            //     //     container.setScale(1.05);
            //     // }
            // });

            // // container.on('pointerout', () => {
            // //     console.log('Pointer out card:', type);
            // //     container.setScale(1);
            // // });

            // // // this.cards.push({
            // // //     type,
            // // //     container,
            // // //     bg,
            // // //     cooldownOverlay,
            // // //     affordOverlay,
            // // //     cooldownText,
            // // //     cardWidth,
            // // //     cardHeight
            // // // });
        });
    }

    canSelect(type) {
        console.log('canSelect');
        const data = PVZ.PlantData[type];
        const gameScene = this.scene.scene.get('GameScene');
        if (!gameScene || !gameScene.sunManager) return false;
        return gameScene.sunManager.canAfford(data.cost) && this.cooldowns[type] <= 0;
    }

    onCardClicked(type) {
        PVZ.SoundManager.play('button_click');
        if (!this.canSelect(type)) {
            console.log('Cannot select - no game scene or sun manager');
            return;
        }

        if (this.selectedPlant === type) {
            this.cancelSelection();
            return;
        }

        this.selectedPlant = type;
        this.scene.game.events.emit('plant-selected', type);
    }

    cancelSelection() {
        this.selectedPlant = null;
        if (this.previewSprite) {
            this.previewSprite.destroy();
            this.previewSprite = null;
        }
        this.scene.game.events.emit('plant-deselected');
    }

    startCooldown(type) {
        const data = PVZ.PlantData[type];
        this.cooldowns[type] = data.cooldown;
    }

    update(time, delta) {
        // Update cooldowns
        Object.keys(this.cooldowns).forEach(type => {
            if (this.cooldowns[type] > 0) {
                this.cooldowns[type] = Math.max(0, this.cooldowns[type] - delta);
            }
        });

        // Update card visuals
        const gameScene = this.scene.scene.get('GameScene');
        this.cards.forEach(card => {
            const data = PVZ.PlantData[card.type];
            const canAfford = gameScene && gameScene.sunManager
                ? gameScene.sunManager.canAfford(data.cost)
                : false;
            const onCooldown = this.cooldowns[card.type] > 0;
            const isSelected = this.selectedPlant === card.type;

            // Redraw afford overlay
            card.affordOverlay.clear();
            if (!canAfford || onCooldown) {
                card.affordOverlay.fillStyle(0x000000, 0.5);
                if (onCooldown) {
                    const pct = this.cooldowns[card.type] / data.cooldown;
                    card.affordOverlay.fillRect(0, 0, card.cardWidth, card.cardHeight * pct);
                } else {
                    card.affordOverlay.fillRect(0, 0, card.cardWidth, card.cardHeight);
                }
            }

            // Update cooldown timer text
            if (onCooldown) {
                const remainingSeconds = Math.ceil(this.cooldowns[card.type] / 1000);
                card.cooldownText.setText(remainingSeconds + 's');
                card.cooldownText.setAlpha(1);
            } else {
                card.cooldownText.setAlpha(0);
            }

            // Selection highlight
            card.bg.clear();
            if (isSelected) {
                card.bg.fillStyle(0x6a5530, 1);
                card.bg.fillRoundedRect(0, 0, card.cardWidth, card.cardHeight, 4);
                card.bg.lineStyle(2, 0xffdd00, 1);
                card.bg.strokeRoundedRect(0, 0, card.cardWidth, card.cardHeight, 4);
            } else {
                card.bg.fillStyle(0x4a3520, 1);
                card.bg.fillRoundedRect(0, 0, card.cardWidth, card.cardHeight, 4);
                card.bg.lineStyle(2, 0x8b7355, 1);
                card.bg.strokeRoundedRect(0, 0, card.cardWidth, card.cardHeight, 4);
            }
        });
    }
};
