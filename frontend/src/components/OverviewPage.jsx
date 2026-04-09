import React from 'react';
import { useFetch }   from '../hooks/useFetch.js';
import { api }        from '../api/client.js';
import KPIGrid        from './KPIGrid.jsx';
import InsightBanner  from './InsightBanner.jsx';
import {
  RegionBarChart, YearTrendChart, VaccinePieChart,
  BrandBarChart,  CagrRadarChart,
} from './Charts.jsx';

function ChartCard({ title, subtitle, badge, children, col = 'col-6', delay = '' }) {
  return (
    <div className={`chart-card ${col} fade-in ${delay}`}>
      <div className="chart-header">
        <div>
          <div className="chart-title">{title}</div>
          {subtitle && <div className="chart-subtitle">{subtitle}</div>}
        </div>
        {badge && <span className="chart-badge">{badge}</span>}
      </div>
      {children}
    </div>
  );
}

export default function OverviewPage({ filters }) {
  const { data, loading, error } = useFetch(
    () => api.getSummary(filters),
    [JSON.stringify(filters)]
  );

  if (error) return <div className="error-box">⚠ Failed to load summary: {error}</div>;

  const s = data || {};

  return (
    <>
      <p className="section-title">Key Performance Indicators</p>
      <KPIGrid kpis={s.kpis} loading={loading} />

      <InsightBanner kpis={s.kpis} byVaccine={s.byVaccine} loading={loading} />

      <p className="section-title">Market Analytics</p>
      {loading ? (
        <div className="loading-overlay"><div className="spinner" /><span className="loading-text">Loading charts…</span></div>
      ) : (
        <div className="charts-grid">
          <ChartCard
            title="Market Size by Region" subtitle="Total market value in $M"
            badge="Bar" col="col-8" delay="fade-in-1"
          >
            <RegionBarChart data={s.byRegion || []} />
          </ChartCard>

          <ChartCard
            title="Vaccine Type Share" subtitle="% of total market"
            badge="Pie" col="col-4" delay="fade-in-2"
          >
            <VaccinePieChart data={s.byVaccine || []} />
          </ChartCard>

          <ChartCard
            title="Market Trend by Year" subtitle="Market size & CAGR growth over time"
            badge="Area" col="col-8" delay="fade-in-3"
          >
            <YearTrendChart data={s.byYear || []} />
          </ChartCard>

          <ChartCard
            title="CAGR by Brand" subtitle="Average annual growth rate"
            badge="Radar" col="col-4" delay="fade-in-4"
          >
            <CagrRadarChart data={s.cagrByBrand || []} />
          </ChartCard>

          <ChartCard
            title="Brand Market Share" subtitle="Top 8 brands by market size"
            badge="Horizontal Bar" col="col-12" delay="fade-in-5"
          >
            <BrandBarChart data={s.byBrand || []} />
          </ChartCard>
        </div>
      )}
    </>
  );
}
