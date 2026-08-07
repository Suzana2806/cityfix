import { useState, useEffect } from 'react';
import './ReportPage.css';

const API_URL = '/api';
const STATUSES = ['Open', 'Acknowledged', 'In Progress', 'Resolved'];
const CATEGORIES = ['General', 'Electricity', 'Water', 'Roads', 'Garbage', 'Safety'];

function ReportPage() {
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

  const totalFiled = issues.length;
  const totalResolved = issues.filter((i) => i.status === 'Resolved').length;
  const totalActive = totalFiled - totalResolved;
  const logNo = String(totalFiled).padStart(3, '0');
  const statusCode = (status) => status.replace(/\s/g, '-').toLowerCase();

  return (
    <div className="sheet">
      <header className="letterhead">
        <div className="letterhead-top">
          <div className="letterhead-text">
            <h1>Report Registry</h1>
            <p>File a new report or track existing ones below</p>
          </div>
          <div className="log-no">
            <span>Log No.</span>
            <strong>{logNo}</strong>
          </div>
        </div>

        <div className="ledger-strip">
          <div className="ledger-cell">
            <strong>{String(totalFiled).padStart(3, '0')}</strong>
            <span>Filed</span>
          </div>
          <div className="ledger-cell">
            <strong>{String(totalActive).padStart(3, '0')}</strong>
            <span>Active</span>
          </div>
          <div className="ledger-cell">
            <strong>{String(totalResolved).padStart(3, '0')}</strong>
            <span>Resolved</span>
          </div>
        </div>
      </header>

      <section className="intake-form">
        <h2>File a New Report</h2>
        <form onSubmit={handleSubmit}>
          <label>
            <span>Issue</span>
            <input
              placeholder="e.g. Pothole on Main St"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </label>
          <label>
            <span>Details</span>
            <input
              placeholder="Optional - location, severity, etc."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </label>
          <label className="category-label">
            <span>Category</span>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </label>
          <button type="submit">Submit Report</button>
        </form>
      </section>

      <section className="registry">
        <div className="registry-controls">
          <label className="filter-label">
            <span>Status</span>
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="">All</option>
              {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </label>
          <label className="sort-toggle">
            <input
              type="checkbox"
              checked={sortByUpvotes}
              onChange={(e) => setSortByUpvotes(e.target.checked)}
            />
            Rank by votes
          </label>
        </div>

        {loading ? (
          <p className="state-note">Loading case files...</p>
        ) : issues.length === 0 ? (
          <p className="state-note">No reports filed yet. Be the first to log one.</p>
        ) : (
          <div className="case-files">
            {issues.map((issue) => (
              <div key={issue.id} className="case-file">
                <div className={`tab tab-${statusCode(issue.status)}`}>
                  #{String(issue.id).padStart(3, '0')}
                </div>
                <div className="case-body">
                  <div className="case-top">
                    <h3>{issue.title}</h3>
                    <button className="vote" onClick={() => handleUpvote(issue.id)}>
                      &#9650; <span>{issue.upvotes}</span>
                    </button>
                  </div>
                  {issue.description && <p className="case-desc">{issue.description}</p>}
                  <div className="case-meta">
                    <span className="ticket">{issue.category}</span>
                    <span className={`stamp stamp-${statusCode(issue.status)}`}>
                      {issue.status}
                    </span>
                    <select
                      value={issue.status}
                      onChange={(e) => handleStatusChange(issue.id, e.target.value)}
                    >
                      {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <button className="close-file" onClick={() => handleDelete(issue.id)}>
                      Close file
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default ReportPage;