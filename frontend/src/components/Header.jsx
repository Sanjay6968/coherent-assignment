import React from 'react';

export default function Header({ theme, toggleTheme, filters }) {
  const activeFilters = Object.entries(filters)
    .filter(([k, v]) => v !== 'all' && v !== '')
    .map(([k, v]) => v);

  const now = new Date().toLocaleDateString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric', year: 'numeric',
  });

  return (
    <header className="header">
      <div className="header-left">
        <div>
          <div className="header-title">Health Insight Dashboard</div>
          <div className="header-subtitle">
            Global Vaccine Market Analytics
            {activeFilters.length > 0 && (
              <span style={{ color: 'var(--accent-blue)', marginLeft: 8 }}>
                · {activeFilters.join(' / ')}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="header-right">
        <div className="live-badge">
          <span className="live-dot" />
          Live · {now}
        </div>
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          id="theme-toggle"
          title="Toggle light/dark mode"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  );
}
