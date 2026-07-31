import { useState, useEffect } from 'react';
import './App.css';

const API_URL = 'http://localhost:5000/api';
const STATUSES = ['Open', 'Acknowledged', 'In Progress', 'Resolved'];
const CATEGORIES = ['General', 'Electricity', 'Water', 'Roads', 'Garbage', 'Safety'];

function App() {
  const [issues, setIssues] = useState([]);
  const [filterStatus, setFilterStatus] = useState('');
  const [sortByUpvotes, setSortByUpvotes] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', category: 'General' });
  const [loading, setLoading] = useState(true);

  const fetchIssues = async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (filterStatus) params.set('status', filterStatus);
    if (sortByUpvotes) params.set('sort', 'upvotes');
    const res = await fetch(`${API_URL}/issues?${params}`);
    const data = await res.json();
    setIssues(data);
    setLoading(false);
  };

  useEffect(() => { fetchIssues(); }, [filterStatus, sortByUpvotes]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    await fetch(`${API_URL}/issues`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setForm({ title: '', description: '', category: 'General' });
    fetchIssues();
  };

  const handleUpvote = async (id) => {
    await fetch(`${API_URL}/issues/${id}/upvote`, { method: 'POST' });
    fetchIssues();
  };

  const handleStatusChange = async (id, status) => {
    await fetch(`${API_URL}/issues/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    fetchIssues();
  };

  const handleDelete = async (id) => {
    await fetch(`${API_URL}/issues/${id}`, { method: 'DELETE' });
    fetchIssues();
  };

  return (
    <div className="app">
      <header>
        <h1>🏙️ CityFix</h1>
        <p>Report and track local civic issues</p>
      </header>

      <form className="issue-form" onSubmit={handleSubmit}>
        <input
          placeholder="Issue title (e.g. Pothole on Main St)"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input
          placeholder="Description (optional)"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <select
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        >
          {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <button type="submit">Report Issue</button>
      </form>

      <div className="controls">
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="">All Statuses</option>
          {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <label>
          <input
            type="checkbox"
            checked={sortByUpvotes}
            onChange={(e) => setSortByUpvotes(e.target.checked)}
          />
          Sort by most upvoted
        </label>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : issues.length === 0 ? (
        <p className="empty">No issues yet. Be the first to report one!</p>
      ) : (
        <div className="issue-list">
          {issues.map((issue) => (
            <div key={issue.id} className={`issue-card status-${issue.status.replace(/\s/g, '-').toLowerCase()}`}>
              <div className="issue-top">
                <h3>{issue.title}</h3>
                <button className="upvote-btn" onClick={() => handleUpvote(issue.id)}>
                  ▲ {issue.upvotes}
                </button>
              </div>
              {issue.description && <p>{issue.description}</p>}
              <div className="issue-meta">
                <span className="tag">{issue.category}</span>
                <select
                  value={issue.status}
                  onChange={(e) => handleStatusChange(issue.id, e.target.value)}
                >
                  {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                <button className="delete-btn" onClick={() => handleDelete(issue.id)}>🗑</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;