# Plant Cooldown System Visualization

## Timeline Example (Potato Mine - 20 second cooldown)

```
Time:    0s     5s     10s    15s    20s
         |      |      |      |      |
Plant:   🥔 → [PLACED] → → → → [READY]
         |                    |
         ↓                    ↓
Card:   ████   ███░   ██░░   █░░░   ░░░░
       (full   (75%   (50%   (25%   (no
        dark)   dark)  dark)  dark)  overlay)
```

## Visual States

### 1. Available (cooldowns[type] = 0)
```
┌─────────────┐
│    🥔       │  ← Plant icon visible
│ Potato Mine │  ← Name visible  
│    25 ☀️     │  ← Cost visible
└─────────────┘
Scale: 1.05 on hover (if affordable)
```

### 2. On Cooldown (cooldowns[type] > 0)
```
┌─────────────┐
│ ████████████ │ ← Black overlay covers percentage
│ ███🥔███████ │   based on remaining cooldown
│ ███ 25 ☀️████ │
└─────────────┘
Scale: 1.0 (no hover effect)
```

## Code Flow

```
1. User clicks card → onCardClicked()
   ↓
2. Plant placed → GameScene emits 'plant-placed'
   ↓  
3. HUD receives event → plantBar.startCooldown(type)
   ↓
4. cooldowns[type] = data.cooldown (20000ms for potato mine)
   ↓
5. Every frame: update() reduces cooldown by delta
   ↓
6. Visual overlay shrinks: height = (remaining/total) * cardHeight
   ↓
7. When cooldown reaches 0 → card becomes selectable again
```

## Cooldown Values (from PlantData.js)

| Plant       | Cooldown | Cost |
|-------------|----------|------|
| Peashooter  | 5s       | 100☀️ |
| Sunflower   | 5s       | 50☀️  |
| Wall-nut    | 20s      | 50☀️  |
| Snow Pea    | 5s       | 175☀️ |
| Cherry Bomb | 30s      | 150☀️ |
| Repeater    | 5s       | 200☀️ |
| Potato Mine | 20s      | 25☀️  |

## Overlay Calculation

```javascript
// Percentage of cooldown remaining
const pct = this.cooldowns[card.type] / data.cooldown;

// Draw black rectangle from top, shrinking as cooldown decreases
card.affordOverlay.fillRect(0, 0, card.cardWidth, card.cardHeight * pct);
```

The overlay starts at full height and shrinks down to 0 as the cooldown expires.