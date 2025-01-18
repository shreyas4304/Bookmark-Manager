const express = require('express');

const app = express();
const PORT = 5000;

// Enable CORS for all origins

const cors = require('cors');
app.use(cors({
    origin: 'https://cuddly-broccoli-g455g47wvppg9xp5-3000.app.github.dev', // Replace with your GitHub app's domain
    methods: ['GET', 'POST'], // Explicitly allow GET and POST
    allowedHeaders: ['Content-Type'],
}));


// Middleware to parse JSON
app.use(express.json());

// In-memory bookmarks list
const bookmarks = [
    { id: 1, title: 'Google', url: 'https://www.google.com' },
    { id: 2, title: 'GitHub', url: 'https://github.com' },
];

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Bookmark Manager Backend!');
});

// Fetch bookmarks
app.get('/bookmarks', (req, res) => {
    res.json(bookmarks);
});

// Add a new bookmark
app.post('/bookmarks', (req, res) => {
    const newBookmark = req.body;

    // Validate input
    if (!newBookmark.title || !newBookmark.url) {
        return res.status(400).json({ message: 'Title and URL are required.' });
    }

    // Add the bookmark
    newBookmark.id = bookmarks.length ? bookmarks[bookmarks.length - 1].id + 1 : 1;
    bookmarks.push(newBookmark);

    console.log('New bookmark added:', newBookmark);
    res.status(201).json({ message: 'Bookmark added!', bookmark: newBookmark });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
