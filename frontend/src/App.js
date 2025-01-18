import React, { useState, useEffect } from 'react';

const API_URL = 'https://cuddly-broccoli-g455g47vvppgc9xp5-5000.app.github.devs'// Replace with your actual backend URL

const App = () => {
    const [bookmarks, setBookmarks] = useState([]);
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Fetch bookmarks from the backend
    const fetchBookmarks = async () => {
        try {
            const response = await fetch(`${API_URL}/bookmarks`);
            if (!response.ok) {
                throw new Error('Failed to fetch bookmarks.');
            }
            const data = await response.json();
            setBookmarks(data);
            setErrorMessage('');
        } catch (error) {
            console.error('Error fetching bookmarks:', error);
            setErrorMessage('Failed to fetch bookmarks.');
        }
    };

    // Add a new bookmark
    const addBookmark = async () => {
        if (!title || !url) {
            setErrorMessage('Title and URL are required.');
            return;
        }

        const newBookmark = { title, url };

        try {
            const response = await fetch(`${API_URL}/bookmarks`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newBookmark),
            });

            if (!response.ok) {
                throw new Error('Failed to add bookmark.');
            }

            const data = await response.json();
            setBookmarks((prev) => [...prev, data.bookmark]);
            setTitle('');
            setUrl('');
            setErrorMessage('');
            setSuccessMessage('Bookmark added successfully!');
        } catch (error) {
            console.error('Error adding bookmark:', error);
            setErrorMessage('Failed to add bookmark.');
        }
    };

    // Fetch bookmarks on component mount
    useEffect(() => {
        fetchBookmarks();
    }, []);

    return (
        <div>
            <h1>Bookmark Manager</h1>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            <ul>
                {bookmarks.map((bookmark) => (
                    <li key={bookmark.id}>
                        <a href={bookmark.url} target="_blank" rel="noopener noreferrer">
                            {bookmark.title}
                        </a>
                    </li>
                ))}
            </ul>
            <h2>Add a New Bookmark</h2>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                type="text"
                placeholder="URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
            />
            <button onClick={addBookmark}>Add Bookmark</button>
        </div>
    );
};

export default App;
