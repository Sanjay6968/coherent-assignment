export function applyFilters(data, { region, brand, year, vaccine, search, page, limit, sortBy, sortDir }) {
  let result = [...data];

  if (region && region !== 'all')  result = result.filter(d => d.region === region);
  if (brand  && brand  !== 'all')  result = result.filter(d => d.brand  === brand);
  if (vaccine && vaccine !== 'all') result = result.filter(d => d.vaccine === vaccine);
  if (year   && year   !== 'all')  result = result.filter(d => d.year   === Number(year));

  if (search && search.trim()) {
    const q = search.trim().toLowerCase();
    result = result.filter(d =>
      d.country.toLowerCase().includes(q) ||
      d.brand.toLowerCase().includes(q)   ||
      d.vaccine.toLowerCase().includes(q) ||
      d.region.toLowerCase().includes(q)
    );
  }

  if (sortBy) {
    const dir = sortDir === 'asc' ? 1 : -1;
    result.sort((a, b) => {
      if (typeof a[sortBy] === 'string') return dir * a[sortBy].localeCompare(b[sortBy]);
      return dir * (a[sortBy] - b[sortBy]);
    });
  }

  const total = result.length;
  const p     = Math.max(1, parseInt(page)  || 1);
  const l     = Math.min(100, Math.max(1, parseInt(limit) || 20));
  const pages = Math.ceil(total / l);
  const start = (p - 1) * l;
  const items = result.slice(start, start + l);

  return { items, total, page: p, pages, limit: l };
}

export function getDistinctValues(data, field) {
  return [...new Set(data.map(d => d[field]))].sort();
}
