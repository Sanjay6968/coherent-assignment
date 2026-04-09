export function computeKPIs(data) {
  if (!data.length) return null;

  const totalMarket   = data.reduce((s, d) => s + d.marketSize, 0);
  const totalDoses    = data.reduce((s, d) => s + d.doses,      0);
  const avgPrice      = data.reduce((s, d) => s + d.price,      0) / data.length;
  const avgCagr       = data.reduce((s, d) => s + d.cagr,       0) / data.length;
  const avgCoverage   = data.reduce((s, d) => s + d.coverage,   0) / data.length;
  const topBrand      = topBy(data, 'marketSize', 'brand');
  const topRegion     = topBy(data, 'marketSize', 'region');

  return {
    totalMarket:  Math.round(totalMarket),
    totalDoses:   Math.round(totalDoses),
    avgPrice:     +avgPrice.toFixed(2),
    avgCagr:      +avgCagr.toFixed(1),
    avgCoverage:  +avgCoverage.toFixed(1),
    topBrand,
    topRegion,
    recordCount:  data.length,
  };
}

function topBy(data, valueField, groupField) {
  const map = {};
  data.forEach(d => {
    map[d[groupField]] = (map[d[groupField]] || 0) + d[valueField];
  });
  return Object.entries(map).sort((a, b) => b[1] - a[1])[0]?.[0] ?? '—';
}

export function marketByRegion(data) {
  const map = {};
  data.forEach(d => {
    if (!map[d.region]) map[d.region] = { region: d.region, marketSize: 0, doses: 0 };
    map[d.region].marketSize += d.marketSize;
    map[d.region].doses      += d.doses;
  });
  return Object.values(map).sort((a, b) => b.marketSize - a.marketSize);
}

export function marketByYear(data) {
  const map = {};
  data.forEach(d => {
    if (!map[d.year]) map[d.year] = { year: d.year, marketSize: 0, doses: 0, avgCagr: [], avgPrice: [] };
    map[d.year].marketSize  += d.marketSize;
    map[d.year].doses       += d.doses;
    map[d.year].avgCagr.push(d.cagr);
    map[d.year].avgPrice.push(d.price);
  });
  return Object.values(map)
    .sort((a, b) => a.year - b.year)
    .map(y => ({
      year:       y.year,
      marketSize: Math.round(y.marketSize),
      doses:      Math.round(y.doses),
      avgCagr:    +(y.avgCagr.reduce((s, v) => s + v, 0) / y.avgCagr.length).toFixed(1),
      avgPrice:   +(y.avgPrice.reduce((s, v) => s + v, 0) / y.avgPrice.length).toFixed(2),
    }));
}

export function marketByBrand(data) {
  const map = {};
  data.forEach(d => {
    if (!map[d.brand]) map[d.brand] = { brand: d.brand, marketSize: 0, doses: 0, records: 0 };
    map[d.brand].marketSize += d.marketSize;
    map[d.brand].doses      += d.doses;
    map[d.brand].records    += 1;
  });
  return Object.values(map).sort((a, b) => b.marketSize - a.marketSize);
}

export function marketByVaccine(data) {
  const map = {};
  data.forEach(d => {
    if (!map[d.vaccine]) map[d.vaccine] = { vaccine: d.vaccine, marketSize: 0, doses: 0, avgCagr: [] };
    map[d.vaccine].marketSize += d.marketSize;
    map[d.vaccine].doses      += d.doses;
    map[d.vaccine].avgCagr.push(d.cagr);
  });
  return Object.values(map)
    .sort((a, b) => b.marketSize - a.marketSize)
    .map(v => ({
      vaccine:    v.vaccine,
      marketSize: Math.round(v.marketSize),
      doses:      Math.round(v.doses),
      avgCagr:    +(v.avgCagr.reduce((s, x) => s + x, 0) / v.avgCagr.length).toFixed(1),
    }));
}

export function cagrByBrand(data) {
  const map = {};
  data.forEach(d => {
    if (!map[d.brand]) map[d.brand] = { brand: d.brand, cagrs: [] };
    map[d.brand].cagrs.push(d.cagr);
  });
  return Object.values(map)
    .map(b => ({ brand: b.brand, avgCagr: +(b.cagrs.reduce((s, v) => s + v, 0) / b.cagrs.length).toFixed(1) }))
    .sort((a, b) => b.avgCagr - a.avgCagr);
}

export function coverageByRegion(data) {
  const map = {};
  data.forEach(d => {
    if (!map[d.region]) map[d.region] = { region: d.region, coverages: [] };
    map[d.region].coverages.push(d.coverage);
  });
  return Object.values(map).map(r => ({
    region: r.region,
    avgCoverage: +(r.coverages.reduce((s, v) => s + v, 0) / r.coverages.length).toFixed(1),
  })).sort((a, b) => b.avgCoverage - a.avgCoverage);
}
