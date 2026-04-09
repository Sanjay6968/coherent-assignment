import { useState, useCallback } from 'react';

const DEFAULTS = { region: 'all', brand: 'all', vaccine: 'all', year: 'all', search: '' };

export function useFilters() {
  const [filters,    setFilters]    = useState(DEFAULTS);
  const [page,       setPage]       = useState(1);
  const [sortBy,     setSortBy]     = useState('marketSize');
  const [sortDir,    setSortDir]    = useState('desc');

  const setFilter = useCallback((key, value) => {
    setFilters(f => ({ ...f, [key]: value }));
    setPage(1);
  }, []);

  const reset = useCallback(() => {
    setFilters(DEFAULTS);
    setPage(1);
    setSortBy('marketSize');
    setSortDir('desc');
  }, []);

  const toggleSort = useCallback((col) => {
    setSortBy(prev => {
      if (prev === col) { setSortDir(d => d === 'asc' ? 'desc' : 'asc'); return col; }
      setSortDir('desc');
      return col;
    });
    setPage(1);
  }, []);

  return { filters, setFilter, reset, page, setPage, sortBy, sortDir, toggleSort };
}
