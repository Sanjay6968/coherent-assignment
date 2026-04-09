import React from 'react';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  AreaChart, Area, RadarChart, Radar, PolarGrid, PolarAngleAxis,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#f43f5e', '#06b6d4', '#6366f1', '#ec4899'];

const fmt = {
  market: v => `$${(v / 1000).toFixed(1)}B`,
  doses:  v => v >= 1e9 ? `${(v / 1e9).toFixed(1)}B` : `${(v / 1e6).toFixed(0)}M`,
  cagr:   v => `${v}%`,
  price:  v => `$${v.toFixed(2)}`,
  pct:    v => `${v}%`,
};

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: 'var(--bg-elevated)', border: '1px solid var(--border)',
      borderRadius: 8, padding: '10px 14px', fontSize: 12,
      boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
    }}>
      <p style={{ color: 'var(--text-primary)', fontWeight: 600, marginBottom: 6 }}>{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color }}>{p.name}: {p.value?.toLocaleString()}</p>
      ))}
    </div>
  );
};

/* ─── 1. Market Size Bar Chart (by Region) ─── */
export function RegionBarChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data} margin={{ top: 4, right: 12, left: -10, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
        <XAxis dataKey="region" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} tickLine={false} />
        <YAxis tickFormatter={fmt.market} tick={{ fontSize: 11, fill: 'var(--text-muted)' }} tickLine={false} axisLine={false} />
        <Tooltip content={<CustomTooltip />} formatter={fmt.market} />
        <Bar dataKey="marketSize" name="Market Size" radius={[6, 6, 0, 0]}>
          {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

/* ─── 2. Market Size Trend Line (by Year) ─── */
export function YearTrendChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <AreaChart data={data} margin={{ top: 4, right: 12, left: -10, bottom: 0 }}>
        <defs>
          <linearGradient id="gradBlue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%"  stopColor="#3b82f6" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}   />
          </linearGradient>
          <linearGradient id="gradViolet" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%"  stopColor="#8b5cf6" stopOpacity={0.25} />
            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}    />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
        <XAxis dataKey="year" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} tickLine={false} />
        <YAxis yAxisId="left"  tickFormatter={fmt.market} tick={{ fontSize: 11, fill: 'var(--text-muted)' }} tickLine={false} axisLine={false} />
        <YAxis yAxisId="right" orientation="right" tickFormatter={fmt.cagr} tick={{ fontSize: 11, fill: 'var(--text-muted)' }} tickLine={false} axisLine={false} />
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ fontSize: 11, color: 'var(--text-secondary)' }} />
        <Area yAxisId="left"  type="monotone" dataKey="marketSize" name="Market Size ($M)" stroke="#3b82f6" fill="url(#gradBlue)"   strokeWidth={2.5} dot={{ fill: '#3b82f6', r: 4 }} />
        <Area yAxisId="right" type="monotone" dataKey="avgCagr"    name="Avg CAGR (%)"     stroke="#8b5cf6" fill="url(#gradViolet)" strokeWidth={2}   dot={{ fill: '#8b5cf6', r: 3 }} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

/* ─── 3. Pie Chart (Vaccine Type share) ─── */
const renderLabel = ({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`;

export function VaccinePieChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie
          data={data}
          dataKey="marketSize"
          nameKey="vaccine"
          cx="50%" cy="50%"
          outerRadius={90}
          label={renderLabel}
          labelLine={{ stroke: 'var(--text-muted)', strokeWidth: 1 }}
        >
          {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
        </Pie>
        <Tooltip formatter={v => fmt.market(v)} />
      </PieChart>
    </ResponsiveContainer>
  );
}

/* ─── 4. Brand Market Share Bar ─── */
export function BrandBarChart({ data }) {
  const top8 = data.slice(0, 8);
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={top8} layout="vertical" margin={{ top: 4, right: 20, left: 30, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
        <XAxis type="number" tickFormatter={fmt.market} tick={{ fontSize: 10, fill: 'var(--text-muted)' }} tickLine={false} axisLine={false} />
        <YAxis type="category" dataKey="brand" tick={{ fontSize: 10, fill: 'var(--text-muted)' }} tickLine={false} width={90} />
        <Tooltip content={<CustomTooltip />} formatter={fmt.market} />
        <Bar dataKey="marketSize" name="Market Size" radius={[0, 6, 6, 0]}>
          {top8.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

/* ─── 5. CAGR Radar Chart (by Brand) ─── */
export function CagrRadarChart({ data }) {
  const top7 = data.slice(0, 7);
  return (
    <ResponsiveContainer width="100%" height={260}>
      <RadarChart data={top7} cx="50%" cy="50%" outerRadius={90}>
        <PolarGrid stroke="var(--border)" />
        <PolarAngleAxis dataKey="brand" tick={{ fontSize: 10, fill: 'var(--text-muted)' }} />
        <Radar name="Avg CAGR" dataKey="avgCagr" stroke="#10b981" fill="#10b981" fillOpacity={0.25} strokeWidth={2} />
        <Tooltip formatter={fmt.cagr} />
      </RadarChart>
    </ResponsiveContainer>
  );
}

/* ─── 6. Coverage by Region Bar ─── */
export function CoverageBarChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={data} margin={{ top: 4, right: 12, left: -10, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
        <XAxis dataKey="region" tick={{ fontSize: 10, fill: 'var(--text-muted)' }} tickLine={false} />
        <YAxis tickFormatter={fmt.pct} tick={{ fontSize: 10, fill: 'var(--text-muted)' }} tickLine={false} axisLine={false} domain={[0, 100]} />
        <Tooltip formatter={fmt.pct} />
        <Bar dataKey="avgCoverage" name="Avg Coverage %" radius={[6, 6, 0, 0]}>
          {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

/* ─── 7. Doses Line Chart (by Year) ─── */
export function DosesLineChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <LineChart data={data} margin={{ top: 4, right: 12, left: -10, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
        <XAxis dataKey="year" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} tickLine={false} />
        <YAxis tickFormatter={fmt.doses} tick={{ fontSize: 11, fill: 'var(--text-muted)' }} tickLine={false} axisLine={false} />
        <Tooltip content={<CustomTooltip />} formatter={v => fmt.doses(v)} />
        <Line type="monotone" dataKey="doses" name="Total Doses" stroke="#f59e0b" strokeWidth={2.5} dot={{ fill: '#f59e0b', r: 4 }} activeDot={{ r: 6 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}
