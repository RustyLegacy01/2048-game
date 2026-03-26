const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const SCORES_FILE = path.join(__dirname, 'scores.json');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Initialize scores file if it doesn't exist
function initScoresFile() {
    if (!fs.existsSync(SCORES_FILE)) {
        fs.writeFileSync(SCORES_FILE, JSON.stringify([], null, 2));
    }
}

// Read scores from file
function readScores() {
    try {
        const data = fs.readFileSync(SCORES_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading scores:', error);
        return [];
    }
}

// Write scores to file
function writeScores(scores) {
    try {
        fs.writeFileSync(SCORES_FILE, JSON.stringify(scores, null, 2));
        return true;
    } catch (error) {
        console.error('Error writing scores:', error);
        return false;
    }
}

// POST /api/score - Submit a score
app.post('/api/score', (req, res) => {
    const { name, score, date } = req.body;

    // Validation
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
        return res.status(400).json({ error: 'Name is required' });
    }
    if (typeof score !== 'number' || score < 0) {
        return res.status(400).json({ error: 'Valid score is required' });
    }

    const trimmedName = name.trim().substring(0, 20); // Max 20 characters
    const scoreEntry = {
        id: Date.now(),
        name: trimmedName,
        score: score,
        date: date || new Date().toISOString()
    };

    const scores = readScores();
    scores.push(scoreEntry);
    
    // Sort by score descending and keep top 100
    scores.sort((a, b) => b.score - a.score);
    const topScores = scores.slice(0, 100);
    
    if (writeScores(topScores)) {
        // Return the rank of this score
        const rank = topScores.findIndex(s => s.id === scoreEntry.id) + 1;
        res.json({ success: true, rank, entry: scoreEntry });
    } else {
        res.status(500).json({ error: 'Failed to save score' });
    }
});

// GET /api/leaderboard - Get top 10 scores
app.get('/api/leaderboard', (req, res) => {
    const scores = readScores();
    const top10 = scores.slice(0, 10);
    res.json(top10);
});

// GET /api/leaderboard/is-highscore/:score - Check if score is a high score
app.get('/api/leaderboard/is-highscore/:score', (req, res) => {
    const score = parseInt(req.params.score, 10);
    const scores = readScores();
    
    // It's a high score if there are fewer than 10 scores or if it's higher than the 10th score
    const isHighScore = scores.length < 10 || score > (scores[9]?.score || 0);
    const minHighScore = scores.length > 0 ? scores[Math.min(scores.length - 1, 9)].score : 0;
    
    res.json({ isHighScore, minHighScore });
});

// Start server
initScoresFile();
app.listen(PORT, () => {
    console.log(`2048 Game Server running on port ${PORT}`);
    console.log(`Open http://localhost:${PORT} to play the game`);
});
