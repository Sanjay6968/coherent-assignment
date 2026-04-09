import React from 'react';

const icons = {
  dashboard:  '⬡',
  chart:      '◈',
  table:      '▤',
  syringe:    '💉',
  globe:      '🌐',
  filter:     '⊟',
};

const NAV_ITEMS = [
  { id: 'overview',  label: 'Overview',      icon: icons.dashboard },
  { id: 'charts',    label: 'Analytics',     icon: icons.chart     },
  { id: 'table',     label: 'Data Explorer', icon: icons.table     },
];

export default function Sidebar({ filters, filterMeta, setFilter, reset, activeTab, setActiveTab }) {
  const { regions = [], brands = [], vaccines = [], years = [] } = filterMeta || {};

  return (
    <aside className="sidebar">
      {/* ── Logo ── */}
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">💉</div>
        <div>
          <div className="sidebar-logo-text">VaxInsight</div>
          <div className="sidebar-logo-sub">Vaccine Analytics</div>
        </div>
      </div>

      {/* ── Navigation ── */}
      <p className="sidebar-section-label">Navigation</p>
      {NAV_ITEMS.map(item => (
        <button
          key={item.id}
          className={`sidebar-nav-item ${activeTab === item.id ? 'active' : ''}`}
          onClick={() => setActiveTab(item.id)}
          id={`nav-${item.id}`}
        >
          <span className="nav-icon">{item.icon}</span>
          {item.label}
        </button>
      ))}

      {/* ── Filters ── */}
      <p className="sidebar-section-label" style={{ marginTop: 8 }}>Filters</p>
      <div className="sidebar-filters">

        <div className="sidebar-filter-group">
          <label className="filter-label" htmlFor="filter-region">Region</label>
          <select id="filter-region" className="filter-select"
            value={filters.region}
            onChange={e => setFilter('region', e.target.value)}>
            <option value="all">All Regions</option>
            {regions.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>

        <div className="sidebar-filter-group">
          <label className="filter-label" htmlFor="filter-brand">Brand</label>
          <select id="filter-brand" className="filter-select"
            value={filters.brand}
            onChange={e => setFilter('brand', e.target.value)}>
            <option value="all">All Brands</option>
            {brands.map(b => <option key={b} value={b}>{b}</option>)}
          </select>
        </div>

        <div className="sidebar-filter-group">
          <label className="filter-label" htmlFor="filter-vaccine">Vaccine Type</label>
          <select id="filter-vaccine" className="filter-select"
            value={filters.vaccine}
            onChange={e => setFilter('vaccine', e.target.value)}>
            <option value="all">All Vaccines</option>
            {vaccines.map(v => <option key={v} value={v}>{v}</option>)}
          </select>
        </div>

        <div className="sidebar-filter-group">
          <label className="filter-label" htmlFor="filter-year">Year</label>
          <select id="filter-year" className="filter-select"
            value={filters.year}
            onChange={e => setFilter('year', e.target.value)}>
            <option value="all">All Years</option>
            {years.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>

        <button className="filter-reset-btn" onClick={reset} id="filter-reset">
          ↺ Reset Filters
        </button>
      </div>
    </aside>
  );
}
