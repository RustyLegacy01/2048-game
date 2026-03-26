# 2048 Game

A fully-featured 2048 game with smooth tile animations and a leaderboard backend.

## Features

- **Smooth Animations**: Tiles slide smoothly using CSS transforms with FLIP-like animation technique
- **Leaderboard**: Persistent high scores stored on the server
- **Responsive Design**: Works on desktop and mobile devices
- **Local Best Score**: Your personal best is saved in localStorage

## Project Structure

```
2048-game/
├── index.html          # Frontend with inline CSS and JavaScript
├── server.js           # Express.js backend
├── package.json        # Node.js dependencies
├── scores.json         # High scores storage (created automatically)
└── README.md           # This file
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/RustyLegacy01/2048-game.git
cd 2048-game
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

4. Open your browser and navigate to:
```
http://localhost:3000
```

## API Endpoints

- `GET /api/leaderboard` - Get top 10 high scores
- `GET /api/leaderboard/is-highscore/:score` - Check if a score qualifies for the leaderboard
- `POST /api/score` - Submit a new score

### POST /api/score

Request body:
```json
{
  "name": "Player Name",
  "score": 2048,
  "date": "2026-03-26T10:00:00.000Z"
}
```

## How to Play

- Use **Arrow Keys** to move tiles
- When two tiles with the same number touch, they merge into one
- Create a tile with the number **2048** to win!
- The game ends when no more moves are possible

## Animation Improvements

The game now uses a proper tile tracking system:

1. **Tile Persistence**: Tile elements are kept in the DOM between moves
2. **Smooth Sliding**: CSS `transform` property is animated for smooth movement
3. **Smart Rendering**: Only new tiles create new DOM elements
4. **Merge Animation**: Merged tiles get a "pop" animation
5. **Removal Animation**: Tiles that were merged into others fade out gracefully

## Development

For development with auto-reload:
```bash
npm run dev
```

## License

MIT
