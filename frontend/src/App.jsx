import React, { useState } from 'react';
import './index.css';

function App() {
  const [file, setFile] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [industry, setIndustry] = useState('General');
  const [lang, setLang] = useState('en');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError(null);
  };

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';

  const handleAnalyze = async () => {
    if (!file) {
      setError("Please select a file first.");
      return;
    }

    setLoading(true);
    setError(null);
    setData(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('industry', industry);
    formData.append('lang', lang);

    try {
      const response = await fetch(`${apiUrl}/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.detail || "Analysis failed. Please check your file format.");
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
      console.error("Error analyzing financials:", err);
    } finally {
      setLoading(false);
    }
  };

  const resetAnalysis = () => {
    setData(null);
    setFile(null);
    setError(null);
  };

  return (
    <div className="container animate-fade-in">
      <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3.5rem', fontWeight: '800', background: 'linear-gradient(to right, #6366f1, #ec4899, #f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '1rem', letterSpacing: '-0.05em' }}>
          SME Financial Navigator
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto' }}>
          Transforming your financial statements into strategic growth insights with enterprise-grade AI.
        </p>
        <div style={{ marginTop: '1.5rem' }}>
          <a
            href="https://github.com/Dhagoo/Financial-Health-Assistant"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '0.6rem 1.2rem', fontSize: '0.9rem', opacity: 0.9 }}
          >
            <span>🔗</span> View on GitHub
          </a>
        </div>
      </header>

      <main className="grid">
        {!data && (
          <section className="glass-card animate-fade-in">
            <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span>📊</span> Assessment Dashboard
            </h2>

            <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem' }}>
              <div style={{ flex: 1 }} className="input-group">
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>Business Sector</label>
                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '12px', background: 'var(--glass-bg)', color: 'white', border: '1px solid var(--border)' }}
                >
                  <option value="General">General Business</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Retail">Retail & Trade</option>
                  <option value="Services">Professional Services</option>
                  <option value="Logistics">Logistics & Supply Chain</option>
                </select>
              </div>
              <div style={{ flex: 1 }} className="input-group">
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>Preferred Language</label>
                <select
                  value={lang}
                  onChange={(e) => setLang(e.target.value)}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '12px', background: 'var(--glass-bg)', color: 'white', border: '1px solid var(--border)' }}
                >
                  <option value="en">English (Global)</option>
                  <option value="hi">Hindi (Regional)</option>
                </select>
              </div>
            </div>

            <div style={{ border: '2px dashed var(--border)', padding: '3rem', textAlign: 'center', borderRadius: '24px', background: 'var(--glass-bg)', transition: 'all 0.3s ease' }}>
              <input
                type="file"
                id="fileUpload"
                onChange={handleFileChange}
                style={{ display: 'none' }}
                accept=".csv,.xlsx"
              />
              {!file ? (
                <label htmlFor="fileUpload" className="btn-primary" style={{ display: 'inline-block', padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
                  Select Financial Statement
                </label>
              ) : (
                <div className="animate-fade-in">
                  <div style={{ fontSize: '1.1rem', marginBottom: '1.5rem', color: '#10b981', fontWeight: 'bold' }}>
                    📎 {file.name}
                  </div>
                  <button
                    onClick={handleAnalyze}
                    className="btn-primary"
                    disabled={loading}
                    style={{ padding: '1rem 3rem', fontSize: '1.1rem', minWidth: '200px' }}
                  >
                    {loading ? 'Performing AI Audit...' : 'Start Assessment'}
                  </button>
                  <p
                    onClick={() => setFile(null)}
                    style={{ marginTop: '1rem', color: 'var(--text-muted)', cursor: 'pointer', textDecoration: 'underline', fontSize: '0.85rem' }}
                  >
                    Change file
                  </p>
                </div>
              )}
            </div>

            {error && (
              <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', borderRadius: '12px', color: '#ef4444', textAlign: 'center', fontSize: '0.9rem' }}>
                ⚠️ {error}
              </div>
            )}
          </section>
        )}

        {data && (
          <div className="grid grid-cols-2 animate-fade-in">
            <section className="glass-card">
              <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span>📈</span> Performance Metrics
              </h3>
              <div style={{ display: 'grid', gap: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: 'var(--glass-bg)', borderRadius: '16px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Annual Revenue</span>
                  <span style={{ fontWeight: 'bold', color: '#10b981', fontSize: '1.1rem' }}>${data.metrics.total_revenue.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: 'var(--glass-bg)', borderRadius: '16px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Operating Expenses</span>
                  <span style={{ fontWeight: 'bold', color: '#ef4444', fontSize: '1.1rem' }}>${data.metrics.total_expenses.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: 'var(--glass-bg)', borderRadius: '16px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Net Profit</span>
                  <span style={{ fontWeight: 'bold', color: '#6366f1', fontSize: '1.1rem' }}>${data.metrics.net_profit.toLocaleString()}</span>
                </div>
                <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem', marginTop: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                    <div style={{ padding: '0.4rem 0.8rem', background: '#10b981', color: 'white', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold' }}>
                      {data.metrics.benchmarking.status}
                    </div>
                    <span style={{ fontSize: '0.9rem' }}>Efficiency Rating</span>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    Sector Context: Your margin of {data.metrics.benchmarking.current} is compared against the {data.metrics.benchmarking.industry} benchmark ({data.metrics.benchmarking.industry_avg}).
                  </p>
                </div>
              </div>
            </section>

            <section className="glass-card" style={{ display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span>🤖</span> AI Advisory
              </h3>
              <div style={{ flex: 1 }}>
                <div style={{ padding: '1.25rem', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '16px', borderLeft: '4px solid #6366f1', marginBottom: '1.5rem' }}>
                  <p style={{ fontWeight: 'bold', color: 'white', marginBottom: '0.75rem', fontSize: '1rem' }}>{data.multilingual_summary}</p>
                  <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.7' }}>{data.recommendation}</p>
                </div>
                <div>
                  <strong style={{ display: 'block', marginBottom: '0.75rem', fontSize: '0.9rem', color: 'white' }}>🚩 Analysis Alerts:</strong>
                  <ul style={{ fontSize: '0.9rem', color: 'var(--text-muted)', paddingLeft: '1.25rem', display: 'grid', gap: '0.5rem' }}>
                    {data.metrics.alerts.map((alert, i) => <li key={i}>{alert}</li>)}
                  </ul>
                </div>
              </div>
              <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
                <button className="btn-primary" style={{ flex: 2 }}>Secure PDF Report</button>
                <button
                  onClick={resetAnalysis}
                  style={{ flex: 1, background: 'transparent', border: '1px solid var(--border)', color: 'white' }}
                >
                  New Audit
                </button>
              </div>
            </section>
          </div>
        )}

        {!data && (
          <>
            <div style={{ textAlign: 'center', padding: '1rem', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '12px', margin: '1rem auto', maxWidth: '400px' }}>
              <a href={`${apiUrl}/sample-csv`} style={{ color: 'var(--primary)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '500' }}>
                📥 Download Industry Sample CSV
              </a>
            </div>

            <div className="grid grid-cols-3 animate-fade-in" style={{ marginTop: '2rem' }}>
              <div className="glass-card" style={{ textAlign: 'center', padding: '2rem' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🛡️</div>
                <h4 style={{ marginBottom: '0.5rem' }}>Risk Analysis</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>AI-driven threat detection for cash flow irregularities.</p>
              </div>
              <div className="glass-card" style={{ textAlign: 'center', padding: '2rem' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📈</div>
                <h4 style={{ marginBottom: '0.5rem' }}>Forecasting</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Advanced predictive modeling for future revenue streams.</p>
              </div>
              <div className="glass-card" style={{ textAlign: 'center', padding: '2rem' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📜</div>
                <h4 style={{ marginBottom: '0.5rem' }}>Compliance</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Automated GST and tax compliance verification checks.</p>
              </div>
            </div>
          </>
        )}
      </main>

      <footer style={{ marginTop: '5rem', padding: '2rem', textAlign: 'center', borderTop: '1px solid var(--border)', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
        <p>🔒 Enterprise-Grade Encryption (AES-256) | Regulatory Compliant Analysis</p>
        <p style={{ marginTop: '0.5rem' }}>&copy; 2026 Financial Navigator Pro. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
