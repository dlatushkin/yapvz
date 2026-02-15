# Plants vs Zombies - Clone

A web-based clone of the classic Plants vs Zombies game built with HTML5, CSS, and JavaScript using the Phaser 3 game engine.

## Requirements

- Modern web browser with JavaScript support
- Local web server (recommended for development)

## How to Run

### Option 1: Simple File Opening (Limited Functionality)
1. Open `index.html` directly in your web browser
   - Note: Some features may not work due to CORS restrictions

### Option 2: Local Web Server (Recommended)

#### Using Python (if installed)
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```
Then open http://localhost:8000 in your browser.

#### Using Node.js (if installed)
```bash
# Install a simple HTTP server globally
npm install -g http-server

# Run the server
http-server
```
Then open the URL shown in the terminal.

#### Using PHP (if installed)
```bash
php -S localhost:8000
```
Then open http://localhost:8000 in your browser.

## Game Structure

- `index.html` - Main HTML file with game container and script includes
- `css/` - Stylesheets
- `assets/` - Game assets (images, sounds)
- `js/` - JavaScript game code organized into:
  - `constants.js` - Game constants
  - `data/` - Game data definitions (plants, zombies, levels)
  - `systems/` - Game systems (grid, sun, wave management)
  - `entities/` - Game entities (plants, zombies, projectiles)
  - `scenes/` - Phaser scenes (menu, game, HUD, etc.)
  - `main.js` - Game initialization

## Development

No build process is required. Simply edit the JavaScript files and refresh your browser to see changes.

The game uses Phaser 3 loaded from CDN, so an internet connection is required for the game engine.

## Browser Compatibility

Requires a modern browser that supports:
- ES6 JavaScript features
- HTML5 Canvas
- Web Audio API (for sounds)