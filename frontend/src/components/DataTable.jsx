import React from 'react';

const REGION_COLORS = {
  'North America':        { bg: 'rgba(59,130,246,0.12)',  color: '#3b82f6' },
  'Europe':               { bg: 'rgba(139,92,246,0.12)', color: '#8b5cf6' },
  'Asia-Pacific':         { bg: 'rgba(16,185,129,0.12)', color: '#10b981' },
  'Latin America':        { bg: 'rgba(245,158,11,0.12)', color: '#f59e0b' },
  'Middle East & Africa': { bg: 'rgba(244,63,94,0.12)',  color: '#f43f5e' },
};

const COLS = [
  { key: 'country',    label: 'Country'     },
  { key: 'region',     label: 'Region'      },
  { key: 'brand',      label: 'Brand'       },
  { key: 'vaccine',    label: 'Vaccine'     },
  { key: 'year',       label: 'Year'        },
  { key: 'marketSize', label: 'Market ($M)' },
  { key: 'price',      label: 'Price/Dose'  },
  { key: 'doses',      label: 'Doses'       },
  { key: 'cagr',       label: 'CAGR %'      },
  { key: 'coverage',   label: 'Coverage %'  },
];

function fmt(key, val) {
  if (key === 'marketSize') return `$${val.toLocaleString()}M`;
  if (key === 'price')      return `$${val.toFixed(2)}`;
  if (key === 'doses')      return val >= 1e9 ? `${(val / 1e9).toFixed(2)}B` : `${(val / 1e6).toFixed(0)}M`;
  if (key === 'cagr')       return `${val}%`;
  if (key === 'coverage')   return `${val}%`;
  return val;
}

export default function DataTable({
  data, meta, loading, error,
  search, setSearch,
  sortBy, sortDir, toggleSort,
  page, setPage,
}) {
  if (error) return <div className="error-box">⚠ {error}</div>;

  return (
    <div className="table-section">
      <div className="table-controls">
        <input
          id="table-search"
          className="table-search"
          placeholder="🔍  Search country, brand, vaccine…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        {meta && (
          <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
            {meta.total.toLocaleString()} records · page {meta.page}/{meta.pages}
          </span>
        )}
      </div>

      <div className="chart-card" style={{ padding: 0, overflow: 'hidden' }}>
        {loading ? (
          <div className="loading-overlay">
            <div className="spinner" />
            <span className="loading-text">Loading data…</span>
          </div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                {COLS.map(c => (
                  <th key={c.key} onClick={() => toggleSort(c.key)}>
                    {c.label}
                    {sortBy === c.key ? (sortDir === 'asc' ? ' ▲' : ' ▼') : ' ⇅'}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map(row => {
                const rc = REGION_COLORS[row.region] || { bg: 'rgba(99,102,241,0.12)', color: '#6366f1' };
                return (
                  <tr key={row.id}>
                    <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{row.country}</td>
                    <td>
                      <span className="region-badge" style={{ background: rc.bg, color: rc.color }}>
                        {row.region}
                      </span>
                    </td>
                    <td>{row.brand}</td>
                    <td>{row.vaccine}</td>
                    <td>{row.year}</td>
                    {['marketSize','price','doses','cagr','coverage'].map(k => (
                      <td key={k}>{fmt(k, row[k])}</td>
                    ))}
                  </tr>
                );
              })}
              {!data.length && (
                <tr><td colSpan={COLS.length} style={{ textAlign: 'center', padding: '32px', color: 'var(--text-muted)' }}>
                  No records match your filters.
                </td></tr>
              )}
            </tbody>
          </table>
        )}

        {meta && meta.pages > 1 && (
          <div className="pagination">
            <span className="pagination-info">
              Showing {((meta.page - 1) * meta.limit) + 1}–{Math.min(meta.page * meta.limit, meta.total)} of {meta.total}
            </span>
            <div className="pagination-controls">
              <button className="page-btn" disabled={meta.page <= 1} onClick={() => setPage(1)}>«</button>
              <button className="page-btn" disabled={meta.page <= 1} onClick={() => setPage(p => p - 1)}>‹</button>
              {Array.from({ length: Math.min(meta.pages, 7) }, (_, i) => {
                const p = i + 1;
                return (
                  <button
                    key={p}
                    className={`page-btn ${meta.page === p ? 'active' : ''}`}
                    onClick={() => setPage(p)}
                  >{p}</button>
                );
              })}
              <button className="page-btn" disabled={meta.page >= meta.pages} onClick={() => setPage(p => p + 1)}>›</button>
              <button className="page-btn" disabled={meta.page >= meta.pages} onClick={() => setPage(meta.pages)}>»</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
