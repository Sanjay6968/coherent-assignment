import React from 'react';
import { useFetch } from '../hooks/useFetch.js';
import { api }      from '../api/client.js';
import {
  RegionBarChart, YearTrendChart, VaccinePieChart,
  BrandBarChart, CoverageBarChart, DosesLineChart,
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

export default function ChartsPage({ filters }) {
  const { data, loading, error } = useFetch(
    () => api.getSummary(filters),
    [JSON.stringify(filters)]
  );

  if (error) return <div className="error-box">⚠ Failed to load charts: {error}</div>;

  if (loading) return (
    <div className="loading-overlay" style={{ height: 400 }}>
      <div className="spinner" />
      <span className="loading-text">Loading analytics…</span>
    </div>
  );

  const s = data || {};

  return (
    <>
      <p className="section-title">Deep-Dive Analytics</p>
      <div className="charts-grid">
        <ChartCard title="Market Size by Region"     subtitle="Aggregated market ($M)"     badge="Bar"            col="col-6" delay="fade-in-1"><RegionBarChart   data={s.byRegion   || []} /></ChartCard>
        <ChartCard title="Vaccine Type Distribution" subtitle="Market share by type"        badge="Pie"            col="col-6" delay="fade-in-2"><VaccinePieChart  data={s.byVaccine  || []} /></ChartCard>
        <ChartCard title="Year-on-Year Trend"        subtitle="Market size & avg CAGR"      badge="Area"           col="col-8" delay="fade-in-3"><YearTrendChart   data={s.byYear     || []} /></ChartCard>
        <ChartCard title="Coverage by Region"        subtitle="Avg population coverage %"   badge="Bar"            col="col-4" delay="fade-in-4"><CoverageBarChart data={s.coverageByRegion || []} /></ChartCard>
        <ChartCard title="Doses Administered"        subtitle="Total doses shipped by year"  badge="Line"           col="col-6" delay="fade-in-5"><DosesLineChart   data={s.byYear     || []} /></ChartCard>
        <ChartCard title="Brand Market Share"        subtitle="Top brands by total revenue"  badge="Horizontal Bar" col="col-6" delay="fade-in-6"><BrandBarChart    data={s.byBrand    || []} /></ChartCard>
      </div>
    </>
  );
}
