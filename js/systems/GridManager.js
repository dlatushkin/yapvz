window.PVZ = window.PVZ || {};

PVZ.GridManager = class GridManager {
    constructor(scene) {
        this.scene = scene;
        this.grid = [];
        for (let r = 0; r < PVZ.GRID_ROWS; r++) {
            this.grid[r] = [];
            for (let c = 0; c < PVZ.GRID_COLS; c++) {
                this.grid[r][c] = null;
            }
        }
    }

    gridToWorld(row, col) {
        return {
            x: PVZ.GRID_OFFSET_X + col * PVZ.CELL_WIDTH + PVZ.CELL_WIDTH / 2,
            y: PVZ.GRID_OFFSET_Y + row * PVZ.CELL_HEIGHT + PVZ.CELL_HEIGHT / 2
        };
    }

    worldToGrid(x, y) {
        const col = Math.floor((x - PVZ.GRID_OFFSET_X) / PVZ.CELL_WIDTH);
        const row = Math.floor((y - PVZ.GRID_OFFSET_Y) / PVZ.CELL_HEIGHT);
        return { row, col };
    }

    isValidCell(row, col) {
        return row >= 0 && row < PVZ.GRID_ROWS && col >= 0 && col < PVZ.GRID_COLS;
    }

    isOccupied(row, col) {
        if (!this.isValidCell(row, col)) return true;
        return this.grid[row][col] !== null;
    }

    placePlant(row, col, plant) {
        if (this.isOccupied(row, col)) return false;
        this.grid[row][col] = plant;
        return true;
    }

    removePlant(row, col) {
        if (!this.isValidCell(row, col)) return;
        this.grid[row][col] = null;
    }

    getPlantAt(row, col) {
        if (!this.isValidCell(row, col)) return null;
        return this.grid[row][col];
    }

    getPlantsInRow(row) {
        const plants = [];
        for (let c = 0; c < PVZ.GRID_COLS; c++) {
            if (this.grid[row][c]) {
                plants.push(this.grid[row][c]);
            }
        }
        return plants;
    }

    drawLawn() {
        const gfx = this.scene.add.graphics();

        // Draw sky background
        gfx.fillStyle(PVZ.COLORS.SKY, 1);
        gfx.fillRect(0, 0, PVZ.GAME_WIDTH, PVZ.GAME_HEIGHT);

        // Draw lawn tiles
        for (let r = 0; r < PVZ.GRID_ROWS; r++) {
            for (let c = 0; c < PVZ.GRID_COLS; c++) {
                const color = (r + c) % 2 === 0 ? PVZ.COLORS.LAWN_LIGHT : PVZ.COLORS.LAWN_DARK;
                gfx.fillStyle(color, 1);
                gfx.fillRect(
                    PVZ.GRID_OFFSET_X + c * PVZ.CELL_WIDTH,
                    PVZ.GRID_OFFSET_Y + r * PVZ.CELL_HEIGHT,
                    PVZ.CELL_WIDTH,
                    PVZ.CELL_HEIGHT
                );
            }
        }

        // Draw subtle grid lines
        gfx.lineStyle(1, PVZ.COLORS.GRID_LINE, 0.3);
        for (let r = 0; r <= PVZ.GRID_ROWS; r++) {
            const y = PVZ.GRID_OFFSET_Y + r * PVZ.CELL_HEIGHT;
            gfx.lineBetween(PVZ.GRID_OFFSET_X, y, PVZ.GRID_OFFSET_X + PVZ.GRID_COLS * PVZ.CELL_WIDTH, y);
        }
        for (let c = 0; c <= PVZ.GRID_COLS; c++) {
            const x = PVZ.GRID_OFFSET_X + c * PVZ.CELL_WIDTH;
            gfx.lineBetween(x, PVZ.GRID_OFFSET_Y, x, PVZ.GRID_OFFSET_Y + PVZ.GRID_ROWS * PVZ.CELL_HEIGHT);
        }

        // Left sidebar
        gfx.fillStyle(0x3d2817, 1);
        gfx.fillRect(0, PVZ.GRID_OFFSET_Y, PVZ.GRID_OFFSET_X, PVZ.GRID_ROWS * PVZ.CELL_HEIGHT);

        // Draw path on the right side (zombie spawn area)
        gfx.fillStyle(0x6b5b3a, 0.3);
        gfx.fillRect(
            PVZ.GRID_OFFSET_X + PVZ.GRID_COLS * PVZ.CELL_WIDTH,
            PVZ.GRID_OFFSET_Y,
            PVZ.GAME_WIDTH - (PVZ.GRID_OFFSET_X + PVZ.GRID_COLS * PVZ.CELL_WIDTH),
            PVZ.GRID_ROWS * PVZ.CELL_HEIGHT
        );

        gfx.setDepth(-1);
    }
};
