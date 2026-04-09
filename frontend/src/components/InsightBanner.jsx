import React from 'react';

export default function InsightBanner({ kpis, byVaccine, loading }) {
  if (loading || !kpis) return null;

  const topVaccine = byVaccine?.[0];
  const insight = topVaccine
    ? `🤖 AI Insight: The <strong>${topVaccine.vaccine}</strong> vaccine leads with
       <strong>$${(topVaccine.marketSize / 1000).toFixed(1)}B</strong> in market size.
       With an average CAGR of <strong>${kpis.avgCagr}%</strong> across the filtered dataset,
       the market is experiencing <strong>${kpis.avgCagr > 12 ? 'rapid' : 'steady'}</strong> growth.
       Top performer: <strong>${kpis.topBrand}</strong> in <strong>${kpis.topRegion}</strong>
       with ${kpis.avgCoverage}% average population coverage.`
    : `🤖 AI Insight: Vaccine market analytics are loaded. Average CAGR stands at
       <strong>${kpis.avgCagr}%</strong> with <strong>$${(kpis.totalMarket / 1000).toFixed(1)}B</strong>
       total market size across <strong>${kpis.recordCount}</strong> data records.`;

  return (
    <div className="insight-banner fade-in">
      <span className="insight-icon">🧬</span>
      <p
        className="insight-text"
        dangerouslySetInnerHTML={{ __html: insight }}
      />
    </div>
  );
}
