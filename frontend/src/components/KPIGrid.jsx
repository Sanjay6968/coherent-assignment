import React from 'react';

const KPI_CONFIG = [
  {
    key:    'totalMarket',
    label:  'Total Market Size',
    icon:   '📊',
    color:  'blue',
    format: v => `$${(v / 1000).toFixed(1)}B`,
    badge:  'Market Cap',
    badgeType: 'up',
  },
  {
    key:    'totalDoses',
    label:  'Total Doses',
    icon:   '💉',
    color:  'violet',
    format: v => v >= 1e9
      ? `${(v / 1e9).toFixed(2)}B`
      : `${(v / 1e6).toFixed(0)}M`,
    badge:  'Doses Administered',
    badgeType: 'neutral',
  },
  {
    key:    'avgCagr',
    label:  'Avg. CAGR',
    icon:   '📈',
    color:  'emerald',
    format: v => `${v}%`,
    badge:  'Growth Rate',
    badgeType: 'up',
  },
  {
    key:    'avgPrice',
    label:  'Avg. Price / Dose',
    icon:   '💲',
    color:  'amber',
    format: v => `$${v.toFixed(2)}`,
    badge:  'Per Dose',
    badgeType: 'neutral',
  },
  {
    key:    'avgCoverage',
    label:  'Avg. Coverage',
    icon:   '🛡️',
    color:  'cyan',
    format: v => `${v}%`,
    badge:  'Population %',
    badgeType: 'up',
  },
  {
    key:    'recordCount',
    label:  'Records Found',
    icon:   '📋',
    color:  'rose',
    format: v => v.toLocaleString(),
    badge:  'Datasets',
    badgeType: 'neutral',
  },
];

export default function KPIGrid({ kpis, loading }) {
  if (loading) {
    return (
      <div className="kpi-grid">
        {KPI_CONFIG.map(c => (
          <div key={c.key} className={`kpi-card ${c.color} fade-in`}>
            <div className="kpi-header">
              <div className={`kpi-icon-wrap ${c.color}`}>{c.icon}</div>
            </div>
            <div className="kpi-value" style={{ background: 'var(--bg-elevated)', borderRadius: 6, height: 32, width: '60%' }} />
            <div className="kpi-label">{c.label}</div>
          </div>
        ))}
      </div>
    );
  }

  if (!kpis) return null;

  return (
    <div className="kpi-grid">
      {KPI_CONFIG.map((c, i) => (
        <div key={c.key} className={`kpi-card ${c.color} fade-in fade-in-${i + 1}`}>
          <div className="kpi-header">
            <div className={`kpi-icon-wrap ${c.color}`}>{c.icon}</div>
            <span className={`kpi-badge ${c.badgeType}`}>
              {c.badgeType === 'up' ? '▲' : '●'} {c.badge}
            </span>
          </div>
          <div className="kpi-value">{c.format(kpis[c.key] ?? 0)}</div>
          <div className="kpi-label">{c.label}</div>
        </div>
      ))}
    </div>
  );
}
