const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

const VALID_STATUSES = ['Open', 'Acknowledged', 'In Progress', 'Resolved'];

// Health check (useful for Docker/Nginx/Jenkins later)
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Get all issues (optional ?status=Open&sort=upvotes)
app.get('/api/issues', (req, res) => {
  const { status, sort } = req.query;
  let query = 'SELECT * FROM issues';
  const params = [];

  if (status) {
    query += ' WHERE status = ?';
    params.push(status);
  }

  query += sort === 'upvotes'
    ? ' ORDER BY upvotes DESC'
    : ' ORDER BY created_at DESC';

  const issues = db.prepare(query).all(...params);
  res.json(issues);
});

// Create a new issue
app.post('/api/issues', (req, res) => {
  const { title, description, category } = req.body;
  if (!title || !title.trim()) {
    return res.status(400).json({ error: 'Title is required' });
  }

  const stmt = db.prepare(
    'INSERT INTO issues (title, description, category) VALUES (?, ?, ?)'
  );
  const result = stmt.run(title.trim(), description || '', category || 'General');

  const newIssue = db.prepare('SELECT * FROM issues WHERE id = ?').get(result.lastInsertRowid);
  res.status(201).json(newIssue);
});

// Upvote an issue
app.post('/api/issues/:id/upvote', (req, res) => {
  const { id } = req.params;
  const issue = db.prepare('SELECT * FROM issues WHERE id = ?').get(id);
  if (!issue) return res.status(404).json({ error: 'Issue not found' });

  db.prepare('UPDATE issues SET upvotes = upvotes + 1 WHERE id = ?').run(id);
  const updated = db.prepare('SELECT * FROM issues WHERE id = ?').get(id);
  res.json(updated);
});

// Update issue status
app.patch('/api/issues/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!VALID_STATUSES.includes(status)) {
    return res.status(400).json({ error: `Status must be one of: ${VALID_STATUSES.join(', ')}` });
  }

  const issue = db.prepare('SELECT * FROM issues WHERE id = ?').get(id);
  if (!issue) return res.status(404).json({ error: 'Issue not found' });

  db.prepare('UPDATE issues SET status = ? WHERE id = ?').run(status, id);
  const updated = db.prepare('SELECT * FROM issues WHERE id = ?').get(id);
  res.json(updated);
});

// Delete an issue
app.delete('/api/issues/:id', (req, res) => {
  const { id } = req.params;
  db.prepare('DELETE FROM issues WHERE id = ?').run(id);
  res.status(204).send();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`CityFix backend running on port ${PORT}`);
});