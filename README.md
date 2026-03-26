# 2048 Game

A fully-featured 2048 game with smooth animations and leaderboard.

## Features
- Smooth tile sliding animations
- Score tracking with localStorage best score
- Global leaderboard (top 10)
- Responsive design
- Game over detection
- Win detection (2048 tile)

## Running with Docker

### Using Docker Compose (recommended)
```bash
docker-compose up -d
```

The game will be available at `http://localhost:8989`

### Using Docker directly
```bash
docker build -t 2048-game .
docker run -d -p 8989:8989 -v $(pwd)/scores.json:/app/scores.json 2048-game
```

### Stopping
```bash
docker-compose down
```

## Running without Docker
```bash
npm install
npm start
```

## How to Play
- Use arrow keys to move tiles
- When two tiles with the same number touch, they merge
- Try to reach the 2048 tile!
